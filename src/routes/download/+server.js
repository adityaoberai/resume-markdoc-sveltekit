import { getPdf } from '$lib/pdf.js';

export async function GET({ url }) {
    let resumeUrl = url.searchParams.get('url');
    console.log(resumeUrl);
    
    const pdfBuffer = await getPdf(resumeUrl);

    console.log(pdfBuffer);

    return new Response(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename*=resume.pdf'
        }
    });
}