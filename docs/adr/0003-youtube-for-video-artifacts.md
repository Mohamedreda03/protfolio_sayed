# 3. YouTube Embeds for Video Artifacts

We decided to store and stream video work via YouTube (storing YouTube video IDs, custom thumbnails, and timestamps in Appwrite Databases) rather than uploading raw video blobs to Appwrite Storage. High-definition video editing deliverables require specialized adaptive-bitrate streaming, heavy caching, and substantial bandwidth. YouTube eliminates storage costs and playback buffering while Appwrite maintains ownership of all display metadata, custom presentation wrappers, and curation.
