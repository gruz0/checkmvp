import fs from 'fs'
import path from 'path'
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'
import { env } from '@/lib/env'

let base64Logo = ''

try {
  const imagePath = path.join(process.cwd(), 'public', 'CheckMVP-Logo.png')
  const imageData = fs.readFileSync(imagePath)
  base64Logo = `data:image/png;base64,${imageData.toString('base64')}`
} catch (error) {
  console.error('Error reading logo:', error)

  throw Error('Error reading logo')
}

// List of available and supported fonts:
// https://gist.github.com/sadikay/d5457c52e7fb2347077f5b0fe5ba9300

try {
  const fontPath = path.join(process.cwd(), 'assets', 'Roboto.ttf')

  Font.register({
    family: 'Roboto',
    src: fontPath,
  })
} catch (error) {
  console.error('Error registering Roboto font:', error)

  throw Error('Error registering Roboto font')
}

try {
  const fontPath = path.join(process.cwd(), 'assets', 'RobotoSlab.ttf')

  Font.register({
    family: 'Roboto Slab',
    src: fontPath,
  })
} catch (error) {
  console.error('Error registering Roboto Slab font:', error)

  throw Error('Error registering Roboto Slab font')
}

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
})

type ValueProposition = {
  mainBenefit: string
  problemSolving: string
  differentiation: string
}

type TargetAudience = {
  id: string
  segment: string
  description: string
  why: string
  painPoints: string[]
  targetingStrategy: string
}

export type TargetAudiences = Array<TargetAudience>

type MarketAnalysis = {
  trends: string
  userBehaviors: string
  marketGaps: string
  innovationOpportunities: string
  strategicDirection: string
}

type Competitor = {
  name: string
  productName: string
  url: string
  coreFeatures: string[]
  valueProposition: string
  userAcquisition: string
  strengths: string[]
  weaknesses: string[]
  differentiationOpportunity: string
}

type Competitors = Array<Competitor>

type CompetitorAnalysis = {
  competitors: Competitors
  comparison: {
    strengths: string[]
    weaknesses: string[]
  }
  differentiationSuggestions: string[]
}

type ProductName = {
  productName: string
  domains: string[]
  why: string
  tagline: string
  targetAudienceInsight: string
  similarNames: string[]
  brandingPotential: string
}

type ProductNames = Array<ProductName>

type SWOTAnalysis = {
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
}

type ElevatorPitch = {
  hook: string
  problem: string
  solution: string
  valueProposition: string
  cta: string
}

type ElevatorPitches = Array<ElevatorPitch>

type GoogleTrendsKeywords = Array<string>

type ContentIdeaForMarketing = {
  platforms: string[]
  ideas: string[]
  benefits: string[]
}

export type Report = {
  data: {
    id: string
    problem: string
    marketExistence: string
    valueProposition: ValueProposition
    targetAudiences: TargetAudiences
    marketAnalysis: MarketAnalysis
    competitorAnalysis: CompetitorAnalysis
    productNames: ProductNames
    swotAnalysis: SWOTAnalysis
    elevatorPitches: ElevatorPitches
    googleTrendsKeywords: GoogleTrendsKeywords
    contentIdeasForMarketing: Record<string, ContentIdeaForMarketing>
  }
}

export const IdeaPDFReport = ({ data }: Report) => (
  <Document
    title="Idea Report"
    author="CheckMVP Authors"
    creator="Alex Kadyrov <kadyrov.dev@gmail.com>"
    language="en"
    pageMode="useOutlines"
  >
    <Page size="A4" style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Created with{' '}
        <Link
          href={`${env.NEXT_PUBLIC_URL}/?utm_source=report&utm_medium=pdf&utm_campaign=idea&utm_content=header_link`}
        >
          CheckMVP.com
        </Link>{' '}
        ~
      </Text>

      <View style={styles.view}>
        <Text style={styles.logo}>
          <Image src={base64Logo} style={{ width: 150, height: 40 }} />
        </Text>

        <Text style={styles.title}>Your Personalized Startup Idea Report</Text>

        <Text style={styles.subtitle}>
          Comprehensive Analysis and Validation of Your Business Concept
        </Text>

        <View style={styles.view}>
          <Text style={styles.subsection}>Table of Contents:</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Link href="#market_analysis">01. Market Analysis</Link>
                {'\n'}
                <Link href="#competitors">02. Competitors</Link>
                {'\n'}
                <Link href="#value_proposition">03. Value Proposition</Link>
                {'\n'}
                <Link href="#target_audiences">04. Target Audiences</Link>
                {'\n'}
                <Link href="#swot_analysis">05. SWOT Analysis</Link>
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>
                <Link href="#elevator_pitches">06. Elevator Pitches</Link>
                {'\n'}
                <Link href="#product_names">07. Product Names</Link>
                {'\n'}
                <Link href="#google_trends_keywords">
                  08. Google Trends Keywords
                </Link>
                {'\n'}
                <Link href="#content_ideas">09. Content Ideas</Link>
                {'\n'}
                <Link
                  href={`${env.NEXT_PUBLIC_URL}/ideas/${data.id}?utm_source=report&utm_medium=pdf&utm_campaign=idea&utm_content=web_version_link`}
                >
                  Full Web version
                </Link>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.view}>
          <Text style={styles.subsection}>How You Defined The Problem:</Text>
          <Text style={styles.text}>{data.problem}</Text>
        </View>
      </View>

      <SectionWelcome />

      <SectionMarketAnalysis
        marketExistence={data.marketExistence}
        marketAnalysis={data.marketAnalysis}
      />

      <SectionCompetitors data={data.competitorAnalysis} />

      <SectionValueProposition data={data.valueProposition} />

      <SectionTargetAudiences data={data.targetAudiences} />

      <SectionSWOTAnalysis data={data.swotAnalysis} />

      <SectionElevatorPitches data={data.elevatorPitches} />

      <SectionProductNames data={data.productNames} />

      <SectionGoogleTrendsKeywords data={data.googleTrendsKeywords} />

      <SectionContentIdeasForMarketing data={data.contentIdeasForMarketing} />

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
)

const SectionWelcome = () => (
  <View style={styles.view} break>
    <Text id="context" style={styles.welcome}>
      Hi there! ❤️
    </Text>

    <Text style={styles.text}>
      I&apos;m Alex, the creator of CheckMVP. I wanted to personally thank you
      for using this tiny product and taking the time to read this report. Your
      interest and enthusiasm mean a lot to me, and I&apos;m happy to be a part
      of your startup journey.
      {'\n'}
      {'\n'}
      If you have any questions, feedback, or ideas on how we can improve
      CheckMVP together, I&apos;d love to hear from you! Your insights help make
      this tool better for everyone. Feel free to reach out to me on X at{' '}
      <Link href="https://x.com/itmistakes_com">@itmistakes_com</Link>.{'\n'}
      {'\n'}
      Wishing you the best of success with your venture!
      {'\n'}
      {'\n'}
      Warm regards,
      {'\n'}
      Alex
    </Text>
  </View>
)

type SectionMarketAnalysisProps = {
  marketExistence: string
  marketAnalysis: MarketAnalysis
}

const SectionMarketAnalysis = ({
  marketExistence,
  marketAnalysis,
}: SectionMarketAnalysisProps) => (
  <View style={styles.view} break>
    <Text id="market_analysis" style={styles.section}>
      Market Analysis Overview
    </Text>

    <Text style={styles.description}>
      Here, we take a closer look at the overall market landscape related to
      your idea. This overview helps you understand who your potential customers
      are, what trends are emerging, and how your product can fit into the
      market. It&apos;s important to know where your idea stands and what
      opportunities are out there.
    </Text>

    <Text style={styles.subsection}>Market Existence:</Text>

    <Text style={styles.text}>{marketExistence}</Text>

    <Text style={styles.subsection}>Trends:</Text>

    <Text style={styles.text}>{marketAnalysis.trends}</Text>

    <Text style={styles.subsection}>User Behaviors:</Text>

    <Text style={styles.text}>{marketAnalysis.userBehaviors}</Text>

    <Text style={styles.subsection}>Market Gaps:</Text>

    <Text style={styles.text}>{marketAnalysis.marketGaps}</Text>

    <Text style={styles.subsection}>Innovation Opportunities:</Text>

    <Text style={styles.text}>{marketAnalysis.innovationOpportunities}</Text>

    <Text style={styles.subsection}>Strategic Direction:</Text>

    <Text style={styles.text}>{marketAnalysis.strategicDirection}</Text>
  </View>
)

type SectionCompetitorsProps = {
  data: CompetitorAnalysis
}

const SectionCompetitors = ({ data }: SectionCompetitorsProps) => (
  <View style={styles.view} break>
    <Text id="competitors" style={styles.section}>
      Competitor Overview
    </Text>

    <Text style={styles.description}>
      This section highlights the main players in your space, showing you who
      else is offering similar solutions. Understanding your competitors can
      help you identify what makes your product unique and where there might be
      gaps in the market that you can fill. It&apos;s all about knowing your
      landscape!
    </Text>

    {data.competitors.map((competitor, idx) => (
      <React.Fragment key={idx}>
        <Text style={styles.subsection}>
          {`${idx + 1}. ${competitor.name}`}
        </Text>

        <Text style={styles.subsectionHeader}>Product:</Text>

        <Text style={styles.text}>
          <Link href={competitor.url}>{competitor.productName}</Link>
        </Text>

        <Text style={styles.subsectionHeader}>Value Proposition:</Text>

        <Text style={styles.text}>{competitor.valueProposition}</Text>

        <Text style={styles.subsectionHeader}>User Acquisition:</Text>

        <Text style={styles.text}>{competitor.userAcquisition}</Text>

        <Text style={styles.subsectionHeader}>Core Features:</Text>

        <SimpleList items={competitor.coreFeatures} />

        <Text style={styles.subsectionHeader}>Strengths:</Text>

        <SimpleList items={competitor.strengths} />

        <Text style={styles.subsectionHeader}>Weaknesses:</Text>

        <SimpleList items={competitor.weaknesses} />

        <Text style={styles.subsectionHeader}>
          Differentiation Opportunities:
        </Text>

        <Text style={styles.text}>{competitor.differentiationOpportunity}</Text>
      </React.Fragment>
    ))}

    <Text style={styles.subsection}>Comparison:</Text>

    <Text style={styles.subsectionHeader}>Strengths:</Text>

    <SimpleList items={data.comparison.strengths} />

    <Text style={styles.subsectionHeader}>Weaknesses:</Text>

    <SimpleList items={data.comparison.weaknesses} />

    <Text style={styles.subsection}>Differentiation Suggestions:</Text>

    <SimpleList items={data.differentiationSuggestions} />
  </View>
)

type SectionValuePropositionProps = {
  data: ValueProposition
}

const SectionValueProposition = ({ data }: SectionValuePropositionProps) => (
  <View style={styles.view} break>
    <Text id="value_proposition" style={styles.section}>
      Value Proposition
    </Text>

    <Text style={styles.description}>
      The value proposition explains what makes your product special. Here, we
      define the main benefits it provides to users and how it effectively
      solves their problems. A clear value proposition helps you articulate why
      someone should choose your product over others.
    </Text>

    <Text style={styles.subsection}>Main Benefit:</Text>

    <Text style={styles.text}>{data.mainBenefit}</Text>

    <Text style={styles.subsection}>How to Pitch It:</Text>

    <Text style={styles.text}>{data.problemSolving}</Text>

    <Text style={styles.subsection}>Differentiation:</Text>

    <Text style={styles.text}>{data.differentiation}</Text>
  </View>
)

type SectionTargetAudiencesProps = {
  data: TargetAudiences
}

const SectionTargetAudiences = ({ data }: SectionTargetAudiencesProps) => (
  <View style={styles.view} break>
    <Text id="target_audiences" style={styles.section}>
      Target Audiences
    </Text>

    <Text style={styles.description}>
      This section presents potential target audiences for your product,
      detailing their specific characteristics and needs. It&apos;s vital to
      understand who you&apos;re trying to reach because tailoring your message
      to these groups can make your product more appealing. Knowing your
      audience is key to success!
    </Text>

    {data.map((audience, idx) => (
      <React.Fragment key={idx}>
        <Text style={styles.subsection}>
          {`${idx + 1}. ${audience.segment}`}
        </Text>

        <Text style={styles.subsectionHeader}>Description:</Text>

        <Text style={styles.text}>{audience.description}</Text>

        <Text style={styles.subsectionHeader}>Why:</Text>

        <Text style={styles.text}>{audience.why}</Text>

        <Text style={styles.subsectionHeader}>Pain Points:</Text>

        <SimpleList items={audience.painPoints} />

        <Text style={styles.subsectionHeader}>Targeting Strategy:</Text>

        <Text style={styles.text}>{audience.targetingStrategy}</Text>
      </React.Fragment>
    ))}
  </View>
)

type SectionSWOTAnalysisProps = {
  data: SWOTAnalysis
}

const SectionSWOTAnalysis = ({ data }: SectionSWOTAnalysisProps) => (
  <View style={styles.view} break>
    <Text id="swot_analysis" style={styles.section}>
      SWOT Analysis
    </Text>

    <Text style={styles.description}>
      SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. In this
      section, we explore these aspects to provide a comprehensive view of your
      product&apos;s position. It&apos;s a helpful exercise that can reveal both
      challenges and potential advantages, guiding your strategy moving forward.
    </Text>

    <Text style={styles.subsection}>Strengths:</Text>

    <SimpleList items={data.strengths} />

    <Text style={styles.subsection}>Weaknesses:</Text>

    <SimpleList items={data.weaknesses} />

    <Text style={styles.subsection}>Opportunities:</Text>

    <SimpleList items={data.opportunities} />

    <Text style={styles.subsection}>Threats:</Text>

    <SimpleList items={data.threats} />
  </View>
)

type SectionElevatorPitchesProps = {
  data: ElevatorPitches
}

const SectionElevatorPitches = ({ data }: SectionElevatorPitchesProps) => (
  <View style={styles.view} break>
    <Text id="elevator_pitches" style={styles.section}>
      Elevator Pitches
    </Text>

    <Text style={styles.description}>
      An elevator pitch is a brief summary of your idea that you can deliver
      quickly and effectively. This section helps you craft a compelling and
      concise way to explain your product to others, which can be especially
      useful when networking or seeking feedback.
    </Text>

    {data.map((pitch, idx) => (
      <React.Fragment key={idx}>
        <Text style={styles.subsection}>{`${idx + 1}. ${pitch.hook}`}</Text>

        <Text style={styles.text}>
          {pitch.problem} {pitch.solution} {pitch.valueProposition}
        </Text>

        <Text style={styles.text}>{pitch.cta}</Text>
      </React.Fragment>
    ))}
  </View>
)

type SectionProductNamesProps = {
  data: ProductNames
}

const SectionProductNames = ({ data }: SectionProductNamesProps) => (
  <View style={styles.view} break>
    <Text id="product_names" style={styles.section}>
      Potential Product Names
    </Text>

    <Text style={styles.description}>
      Here, we brainstorm some catchy names for your product. A good name can
      leave a lasting impression and make your product more memorable. This is a
      fun part of the process that allows you to think creatively!
    </Text>

    {data.map((productName, idx) => (
      <React.Fragment key={idx}>
        <Text style={styles.subsection}>
          {`${idx + 1}. ${productName.productName}`}
        </Text>

        <Text style={styles.text}>
          {productName.why} {productName.targetAudienceInsight}
        </Text>

        <Text style={styles.subsectionHeader}>Branding Potential:</Text>

        <Text style={styles.text}>{productName.brandingPotential}</Text>

        <Text style={styles.subsectionHeader}>Potential Domains:</Text>

        <Text style={styles.text}>
          {productName.domains.map((item, idx) => (
            <React.Fragment key={idx}>
              -{' '}
              <Link
                href={`https://www.namecheap.com/domains/registration/results/?domain=${item}`}
              >
                {item}
              </Link>
              {'\n'}
            </React.Fragment>
          ))}
        </Text>

        <Text style={styles.subsectionHeader}>Similar Product Names:</Text>

        <SimpleList items={productName.similarNames} />
      </React.Fragment>
    ))}
  </View>
)

type SectionGoogleTrendsKeywordsTypes = {
  data: GoogleTrendsKeywords
}

const SectionGoogleTrendsKeywords = ({
  data,
}: SectionGoogleTrendsKeywordsTypes) => (
  <View style={styles.view} break>
    <Text id="google_trends_keywords" style={styles.section}>
      Google Trends Keywords
    </Text>

    <Text style={styles.description}>
      In this section, we look at popular search terms related to your product.
      Understanding which keywords are trending can inform your marketing
      strategy and help you attract the right audience. It&apos;s a practical
      way to connect your idea with what people are already searching for.
    </Text>

    <Text style={styles.subsection}>Suggested Keywords to Analyze:</Text>

    <Text style={styles.text}>
      These AI-suggested keywords are a starting point for exploring market
      trends. Click any keyword to view its popularity on Google Trends. We
      recommend checking different time periods like 1 week and 90 days. Be sure
      to conduct your own research as well.
    </Text>

    <Text style={styles.text}>
      {data.map((item, idx) => (
        <React.Fragment key={idx}>
          -{' '}
          <Link
            href={`https://trends.google.com/trends/explore?date=today%201-m&q=${item}&hl=en`}
          >
            {item}
          </Link>
          {'\n'}
        </React.Fragment>
      ))}
    </Text>
  </View>
)

type SectionContentIdeasForMarketingProps = {
  data: Record<string, ContentIdeaForMarketing>
}

const SectionContentIdeasForMarketing = ({
  data,
}: SectionContentIdeasForMarketingProps) => (
  <View style={styles.view} break>
    <Text id="content_ideas" style={styles.section}>
      Content Ideas For Marketing
    </Text>

    <Text style={styles.description}>
      This section provides you with fresh ideas for marketing content that
      resonates with your target audience. From blog posts to social media
      updates, having a content plan helps you engage potential users and create
      buzz around your product.
    </Text>

    <ContentIdea
      header="1. Social Media Campaigns"
      data={data['socialMediaCampaigns']}
    />

    <ContentIdea
      header="2. Blogging and Guest Posts"
      data={data['bloggingAndGuestPosts']}
    />

    <ContentIdea header="3. Email Marketing" data={data['emailMarketing']} />

    <ContentIdea header="4. Surveys & Polls" data={data['surveysAndPolls']} />

    <ContentIdea header="5. Video Content" data={data['videoContent']} />

    <ContentIdea
      header="6. Infographics and Visual Content"
      data={data['infographicsAndVisualContent']}
    />

    <ContentIdea
      header="7. Community Engagement"
      data={data['communityEngagement']}
    />

    <ContentIdea header="8. Paid Advertising" data={data['paidAdvertising']} />

    <ContentIdea
      header="9. Webinars & Live Streams"
      data={data['webinarsAndLiveStreams']}
    />

    <ContentIdea
      header="10. Partnerships & Collaborations"
      data={data['partnershipsAndCollaborations']}
    />
  </View>
)

const SimpleList = ({ items }: { items: string[] }) => (
  <Text style={styles.text}>
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        - {item}
        {'\n'}
      </React.Fragment>
    ))}
  </Text>
)

interface ContentIdeaSectionProps {
  header: string
  data: ContentIdeaForMarketing
}

const ContentIdea: React.FC<ContentIdeaSectionProps> = ({ header, data }) => (
  <>
    <Text style={styles.subsection}>{header}</Text>

    <Text style={styles.subsectionHeader}>Platforms:</Text>

    <Text style={styles.text}>{data.platforms.join(', ')}</Text>

    <Text style={styles.subsectionHeader}>Ideas:</Text>

    <SimpleList items={data.ideas} />

    <Text style={styles.subsectionHeader}>Benefits:</Text>

    <SimpleList items={data.benefits} />
  </>
)

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  view: {},
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    padding: 5,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Roboto',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto Slab',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Roboto',
    margin: '0px 12px 40px 12px',
  },
  section: {
    fontSize: 24,
    margin: 12,
    fontFamily: 'Roboto Slab',
    border: '1px solid #111',
    color: '#f5f5f5',
    padding: '6px 10px',
    backgroundColor: '#2563eb',
  },
  welcome: {
    fontSize: 24,
    margin: 12,
    fontFamily: 'Roboto Slab',
    padding: '6px 10px',
  },
  subsection: {
    fontSize: 20,
    margin: '12px 12px 8px 12px',
    fontFamily: 'Roboto',
    padding: '3px 10px',
    borderBottom: '1px solid #ddd',
    color: '#222',
  },
  subsectionHeader: {
    fontSize: 16,
    margin: '10px 12px 4px 12px',
    padding: '3px 10px',
    fontFamily: 'Roboto',
    color: '#222',
  },
  description: {
    margin: '2px 12px 8px 12px',
    padding: '8px 10px',
    border: '1px solid #ddd',
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Roboto',
    lineHeight: '1.4',
    backgroundColor: '#f5f5f5',
  },
  text: {
    margin: '2px 12px 8px 12px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Roboto',
    lineHeight: '1.4',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: 'grey',
  },
})
