"use client";
import React from "react";

export default function Error({ error, reset }) {
	return (
		<div style={{ padding: 20 }}>
			<h2>出错了</h2>
			{error?.message ? <p style={{ marginTop: 8 }}>{String(error.message)}</p> : null}
			<button
				onClick={() => reset()}
				style={{ marginTop: 12, padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc" }}
			>
				重试
			</button>
		</div>
	);
}

