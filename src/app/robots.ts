import type { MetadataRoute } from 'next';
import { isPublished, siteUrl } from '@/lib/site';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(isPublished?{allow:'/',disallow:'/api/'}:{disallow:'/'})},...(isPublished?{sitemap:`${siteUrl}/sitemap.xml`}:{})};}
