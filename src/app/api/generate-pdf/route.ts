import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { getSolutionBySlug } from '../../../../lib/api';
import type { Solution } from '../../../../lib/api';

// 辅助函数：创建一个用于生成PDF的HTML模板
const createPdfTemplate = (solution: Solution) => {
  // 在真实应用中，这里会是一个更复杂的HTML结构，并可能带有CSS样式
  const descriptionText = Array.isArray(solution.description) && solution.description[0]?.children[0]?.text 
    ? solution.description[0].children[0].text 
    : 'Description not available.';

  return (
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${solution.name}</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; }
        h1 { color: #333; }
        p { color: #555; line-height: 1.6; }
      </style>
    </head>
    <body>
      <h1>${solution.name}</h1>
      <p>${descriptionText}</p>
      <hr />
      <p><em>Document generated on ${new Date().toLocaleDateString()}</em></p>
    </body>
    </html>
  `);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');

  if (!slug) {
    return new NextResponse('Missing slug parameter', { status: 400 });
  }

  try {
    const solution = await getSolutionBySlug(slug, locale || 'en');

    if (!solution) {
      return new NextResponse(`Solution with slug "${slug}" not found`, { status: 404 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = createPdfTemplate(solution);
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return new NextResponse('Failed to generate PDF', { status: 500 });
  }
}
