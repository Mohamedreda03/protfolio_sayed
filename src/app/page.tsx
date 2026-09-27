import { getProfile, getShowcaseItems, getSkills, getCertifications } from "@/lib/appwrite/data";
import { PortfolioShell } from "@/components/home/portfolio-shell";

export const revalidate = 60; // ISR revalidation every 60s

export async function generateMetadata() {
  const profile = await getProfile();
  return {
    title: `${profile.name} | ${profile.title}`,
    description: profile.summary,
  };
}

export default async function HomePage() {
  const [profile, showcaseItems, skills, certifications] = await Promise.all([
    getProfile(),
    getShowcaseItems(),
    getSkills(),
    getCertifications(),
  ]);

  return (
    <PortfolioShell
      profile={profile}
      showcaseItems={showcaseItems}
      skills={skills}
      certifications={certifications}
    />
  );
}
