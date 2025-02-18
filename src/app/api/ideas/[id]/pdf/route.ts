import { renderToBuffer } from '@react-pdf/renderer'
import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'
import { IdeaPDFReport, Report } from '@/components/IdeaPDFReport'
import { App } from '@/idea/service/Service'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    // FIXME: Replace with App.Queries.GetReport that will return non-nullable fields.
    // It can be done only after implementing all sections.
    const dto = await App.Queries.GetIdea.handle({
      id: params.id,
    })

    if (!dto.contextAnalysis) {
      throw new Error('No context analysis')
    }

    if (!dto.valueProposition) {
      throw new Error('No value proposition')
    }

    if (!dto.marketAnalysis) {
      throw new Error('No market analysis')
    }

    if (!dto.competitorAnalysis) {
      throw new Error('No competitor analysis')
    }

    if (!dto.productNames) {
      throw new Error('No product names')
    }

    if (!dto.swotAnalysis) {
      throw new Error('No SWOT analysis')
    }

    if (!dto.elevatorPitches) {
      throw new Error('No elevator pitches')
    }

    if (!dto.googleTrendsKeywords) {
      throw new Error('No Google Trends keywords')
    }

    if (!dto.contentIdeasForMarketing) {
      throw new Error('No content ideas for marketing')
    }

    if (!dto.testingPlan) {
      throw new Error('No two week testing plan')
    }

    const report: Report = {
      data: {
        id: dto.id,
        problem: dto.problem,
        contextAnalysis: dto.contextAnalysis,
        marketExistence: dto.marketExistence,
        valueProposition: dto.valueProposition,
        targetAudience: dto.targetAudience,
        marketAnalysis: dto.marketAnalysis,
        competitorAnalysis: dto.competitorAnalysis,
        productNames: dto.productNames,
        swotAnalysis: dto.swotAnalysis,
        elevatorPitches: dto.elevatorPitches,
        googleTrendsKeywords: dto.googleTrendsKeywords,
        contentIdeasForMarketing: dto.contentIdeasForMarketing,
        twoWeekTestingPlan: dto.testingPlan,
      },
    }

    const pdfBuffer = await renderToBuffer(IdeaPDFReport(report))

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CheckMVP-Report.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error while generating a report:', error)

    Sentry.captureException(error)

    return NextResponse.json(
      { error: 'Error while generating a report.' },
      { status: 500 }
    )
  }
}
