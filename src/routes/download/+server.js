import { getPdf } from '$lib/pdf.js';

export async function GET({ url }) {
    let resumeUrl = url.searchParams.get('resume');
    console.log(resumeUrl);
    
    const pdfBuffer = await getPdf(resumeUrl);

    return new Response(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            'Content-Disposition': 'attachment; filename*=resume.pdf'
        }
    });
}