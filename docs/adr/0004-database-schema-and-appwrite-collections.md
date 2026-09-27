# 4. Appwrite Cloud Database Collections Schema

We decided to structure the Appwrite Database with four distinct Collections:
1. `profiles`: Singleton holding owner bio, titles, avatar file ID, resume URL, and social profiles.
2. `showcase_items`: Work items categorized by `track` ('cinema' | 'data'), holding title, slug, summary, detailed markdown body, tags, metrics (key-value strings), youtube_id (for cinema), pipeline_blueprint/github_url (for data), and featured flags.
3. `skills`: Grouped by track and category with proficiency indicators.
4. `inquiries`: Direct contact form submissions stored securely with read/write rules.

This clear separation enables efficient server-side data fetching, tight caching with Next.js revalidation tags, and straightforward CRUD operations in the Admin Dashboard without schema sprawl.
