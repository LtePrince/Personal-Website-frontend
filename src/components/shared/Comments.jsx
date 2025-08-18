'use client';
import React from 'react';
import Giscus from '@giscus/react';
export default function Comments({
	repo = process.env.NEXT_PUBLIC_GISCUS_REPO || 'LtePrince/Discussion',
	repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_kgDOOr48BQ',
	category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Q&A',
	categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOOr48Bc4CqR-D',
	mapping = 'pathname', reactionsEnabled = '1', emitMetadata = '0', inputPosition = 'top', theme = 'light', lang = 'en', strict = '0',
}) {
	return <Giscus {...{ repo, repoId, category, categoryId, mapping, reactionsEnabled, emitMetadata, inputPosition, theme, lang, strict }} />;
}
export { default } from '@/components/Comments';
