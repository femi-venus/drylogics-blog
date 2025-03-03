'use client';

import MarketingLandingHero from '../landing/marketing-landing-hero';
import MarketingLandingAbout from '../landing/marketing-landing-about';
import MarketingLandingProcess from '../landing/marketing-landing-process';
import MarketingLandingFreeSEO from '../landing/marketing-landing-free-seo';
import MarketingLandingServices from '../landing/marketing-landing-services';
import MarketingFeatures from '../landing/marketing-landing-case-studies';
import TravelLandingIntroduce from '../landing/travel-landing-introduce';
import ElearningLandingIntroduce from './elearning-landing-introduce';

// ----------------------------------------------------------------------

export default function MarketingLandingView() {
  return (
    <>
      <MarketingLandingHero />

      <MarketingLandingAbout />

      <MarketingLandingServices  />

      <MarketingLandingProcess />

      <MarketingFeatures />

      <TravelLandingIntroduce />

      <ElearningLandingIntroduce />


      {/* <MarketingTeam members={_members} /> */}

      {/* <PricingMarketing plans={_pricingMarketing} /> */}

      {/* <MarketingLandingFaqs /> */}

      {/* <MarketingTestimonial testimonials={_testimonials} /> */}

      {/* <BlogMarketingLatestPosts posts={_marketingPosts.slice(0, 4)} /> */}

      <MarketingLandingFreeSEO />

      {/* <MarketingNewsletter /> */}
    </>
  );
}
