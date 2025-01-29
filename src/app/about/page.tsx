import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Photo from './photo.jpeg'

export default async function AboutPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 mt-2 text-center text-3xl font-bold text-blue-600 md:mb-8 md:mt-4 md:text-4xl dark:text-gray-100">
        About CheckMVP
      </h1>

      <div className="text-justify text-lg leading-relaxed">
        <Image
          src={Photo.src}
          width={600}
          height={488}
          alt="Authors of CheckMVP"
          className="float-none mb-4 w-full rounded-lg shadow-lg md:float-right md:ml-8 md:w-2/5"
        />

        <p className="mb-4">
          Hey! I&apos;m Alex, the creator of CheckMVP. I&apos;ve been building
          and launching my own products since I started programming
          professionally back in 2005. Over the years, I&apos;ve had my share of
          wins... and my share of products that didn&apos;t quite take off.
        </p>

        <p className="mb-4">
          After a while, I started to see the pattern: I was pouring time and
          effort into building things that, honestly, no one really wanted to
          use. Sound familiar? We&apos;ve all been there!
        </p>

        <p className="mb-4">
          So I decided to solve this problem for good. I wanted a tool that
          could take a raw idea and transform it into something actionable -
          showing me the potential market, possible customers, competitors, and
          the steps to get it out there fast. I wanted to validate ideas without
          losing months in development.
        </p>
      </div>

      <div className="mt-8 text-justify text-lg md:mt-10 lg:mt-14">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
          Just Talk to Your Customers!
        </h2>

        <p className="mb-4">
          Now, people always say that, and they&apos;re right! But what if you
          don&apos;t know exactly who your customers are yet? Or you&apos;re new
          to marketing and sales? What if you&apos;re guessing instead of
          knowing exactly who your ideal customer is? That&apos;s where CheckMVP
          comes in.
        </p>

        <p className="mb-4">
          CheckMVP is designed for us: developers, indie hackers, digital
          creators, and early-stage founders. It helps us shape our raw ideas
          into clear, actionable concepts and validate them fast. So we can
          focus on building things people will love. Validate first – then
          build. This is the way.
        </p>
      </div>

      <div className="mt-8 text-justify text-lg md:mt-10 lg:mt-14">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
          What We Bring to The Table?
        </h2>

        <p className="mb-4">
          CheckMVP is an AI-powered platform that uses vast knowledge to help
          you refine your idea, concept, product, or startup using proven
          techniques that people have used successfully for years. AI is great;
          we love AI. These days, most of us turn to AI before using search
          engines. Why not utilize its power, right?
        </p>

        <p className="mb-4">
          This is the 5th version of CheckMVP. I started with simple DMs on X
          and a few of my friends, asking them about their product ideas. Then I
          jumped into ChatGPT and built a few reports. Once people were
          satisfied, I created a Google Form to collect more detailed answers
          without spending too much time in chat. After that, I set up an
          automation using Tally, Google Docs, and other tools. Only after all
          these steps did I start building this web app.
        </p>

        <p className="mb-4">
          It&apos;s been a long journey. And do you know how I got to this
          point? By using my own tool to build my own tool. Everything you see
          here was suggested to me by CheckMVP while I was developing CheckMVP.
        </p>
      </div>

      <div className="mt-8 text-justify text-lg md:mt-10 lg:mt-14">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
          Why Use CheckMVP Instead of ChatGPT?
        </h2>

        <p className="mb-4">
          Sure, you could open ChatGPT and type out prompts yourself. But
          we&apos;ve spent weeks fine-tuning prompts and combining them into a
          single, hassle-free workflow. The result? You&apos;ll get structured
          insights specifically tailored for startup validation, without the
          trial-and-error prompt tweaking or juggling multiple tabs.
        </p>
      </div>

      <div className="mt-8 text-justify text-lg md:mt-10 lg:mt-14">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
          Honest Disclaimer: AI Isn&apos;t Perfect
        </h2>

        <p className="mb-4">
          We rely on an older variant of GPT-4o for quick, automated insights.
          Sometimes the AI may provide outdated info or &quot;hallucinate.&quot;
          If accuracy is critical for you, we also offer a manually crafted,
          deep-dive analysis using the latest models, reviewed by a human
          (that&apos;s me!). It takes a bit longer, but you&apos;ll get more
          credible, in-depth results.
        </p>
      </div>

      <div className="mt-8 text-justify text-lg md:mt-10 lg:mt-14">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-700 md:mb-8 md:text-3xl lg:text-4xl dark:text-gray-100">
          Let&apos;s Build Something Great Together
        </h2>

        <p className="mb-4">
          I&apos;m constantly refining CheckMVP because I genuinely love helping
          founders succeed. Whether you&apos;re testing a side project or a big
          idea, CheckMVP makes it easy to spot red flags early, find new
          opportunities, and move forward with confidence.
        </p>
      </div>

      <div className="mb-6 pt-6 text-center">
        <Link
          href="/start"
          className="justify-center rounded-md border border-transparent bg-[#023840] px-8 py-4 text-2xl font-medium text-[#7bf179] shadow-sm hover:bg-[#034e59] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:bg-[#7bf179] dark:text-[#023840] dark:hover:bg-[#5ed15b]"
        >
          Take the First Step
        </Link>
      </div>
    </div>
  )
}
