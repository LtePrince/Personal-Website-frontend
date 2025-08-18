"use client";
import React, { useEffect, useState } from 'react';
import { apiUrl } from '@/lib/api';
import { FaCloudSun, FaMapMarkerAlt, FaMicrochip, FaMemory, FaHdd, FaComments, FaWind, FaTint } from 'react-icons/fa';
import { FaSmog } from 'react-icons/fa';

function beaufortFromKmh(kmh) { const s = Number(kmh) || 0; if (s < 1) return 0; if (s <= 5) return 1; if (s <= 11) return 2; if (s <= 19) return 3; if (s <= 28) return 4; if (s <= 38) return 5; if (s <= 49) return 6; if (s <= 61) return 7; if (s <= 74) return 8; if (s <= 88) return 9; if (s <= 102) return 10; if (s <= 117) return 11; return 12; }
function aqiCategoryUS(aqi) { const v = Number(aqi); if (!isFinite(v)) return '未知'; if (v <= 50) return '优'; if (v <= 100) return '良'; if (v <= 150) return '轻度污染'; if (v <= 200) return '中度污染'; if (v <= 300) return '重度污染'; return '严重污染'; }
function weatherTextFallback(txt) { if (!txt || typeof txt !== 'string') return '天气'; return txt; }

export default function SystemOverview({ isDarkMode }) {
	// 统一内部字段命名，前端状态与后端字段做一次解耦
	const [weather, setWeather] = useState({ location: null, tempC: null, windSpeedKmh: null, windLevel: null, humidity: null, aqiUS: null, aqiText: null, weatherText: null, updatedAt: null });
	const stats = { cpu: 18, mem: 42, disk: 68 };
	const comments = [ { id: 1, author: 'Alice', text: 'comment1' }, { id: 2, author: 'Bob', text: 'comment2' }, { id: 3, author: 'Carol', text: 'comment3' } ];
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await fetch(apiUrl('Weather'), { cache: 'no-store' });
				if (!res.ok) return;
				const data = await res.json();
				if (!mounted) return;
				const num = v => {
					if (v === null || v === undefined || v === '') return null;
					const n = Number(v);
					return Number.isFinite(n) ? n : null;
				};
				const location = (data.location && typeof data.location === 'string') ? data.location : weather.location;
				const temp = num(data.temperatureC);
				const windKmh = num(data.windSpeedKmh);
				let windLevel = num(data.windLevel);
				if (windLevel == null && windKmh != null) windLevel = beaufortFromKmh(windKmh);
				const rh = num(data.humidity);
				const aqi = num(data.aqiUS);
				const wtext = weatherTextFallback(data.weatherText);
				setWeather(prev => ({
					...prev,
					location,
					tempC: temp != null ? Math.round(temp) : null,
					windSpeedKmh: windKmh != null ? Math.round(windKmh) : null,
					windLevel: windLevel != null ? windLevel : null,
					humidity: rh != null ? Math.round(rh) : null,
					aqiUS: aqi != null ? Math.round(aqi) : null,
					aqiText: aqiCategoryUS(aqi),
					weatherText: wtext,
					updatedAt: data.updatedAt || null,
				}));
			} catch { /* 忽略错误，保持初始占位 */ }
		})();
		return () => { mounted = false; };
	}, []);
	return (
		<div className={`system-overview ${isDarkMode ? 'dark-mode' : ''}`}>
			<div className="overview-inner">
				<section className="visitor-card">
					<h2 className={isDarkMode ? 'dark-mode' : ''}>Today</h2>
					<div className="visitor-row"><FaMapMarkerAlt size={18} className="row-icon" /><span className="visitor-location">{weather.location}</span></div>
					<div className="visitor-row"><FaCloudSun size={18} className="row-icon" /><span className="visitor-primary">{weather.weatherText}{typeof weather.tempC === 'number' ? ` · ${weather.tempC}°C` : ''}</span></div>
					<div className="visitor-row"><FaWind size={18} className="row-icon" /><span>{typeof weather.windLevel === 'number' ? `${weather.windLevel}级` : '—'}{typeof weather.windSpeedKmh === 'number' ? ` · ${weather.windSpeedKmh} km/h` : ''}</span></div>
					<div className="visitor-row"><FaTint size={18} className="row-icon" /><span>{typeof weather.humidity === 'number' ? `${weather.humidity}%` : '—'}</span></div>
					<div className="visitor-row"><FaSmog size={18} className="row-icon" /><span>{typeof weather.aqiUS === 'number' ? `${weather.aqiUS} · ${weather.aqiText}` : '—'}</span></div>
				</section>
				<section className="server-card">
					<h2 className={isDarkMode ? 'dark-mode' : ''}>Server Status</h2>
						{[['CPU','cpu'],['Memory','mem'],['Disk','disk']].map(([label,key]) => (
							<div className="stat-item" key={key}>
								<div className="stat-label">{key==='cpu'?<FaMicrochip size={16} className="row-icon" />: key==='mem'?<FaMemory size={16} className="row-icon" />:<FaHdd size={16} className="row-icon" />} {label}<span className="stat-value">{stats[key]}%</span></div>
								<div className="meter"><span style={{ width: `${stats[key]}%` }} /></div>
							</div>
						))}
				</section>
				<section className="comments-card">
					<h2 className={isDarkMode ? 'dark-mode' : ''}><FaComments size={18} className="row-icon" /> Recent Comments</h2>
					<ul className="comments-list">{comments.map(c => <li key={c.id}><strong>{c.author}:</strong> <span>{c.text}</span></li>)}</ul>
				</section>
			</div>
		</div>
	);
}
