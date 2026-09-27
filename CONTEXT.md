# Portfolio Domain Context

Dual-domain portfolio and content management system for showcasing Video Editing and Big Data Engineering careers.

## Language

### Personas & Navigation

**Track**:
A dedicated professional focus area within the portfolio, specifically either `Cinema Reel` (Video Editing & Motion Design) or `Data Engine` (Big Data Engineering & Distributed Systems).
_Avoid_: Category, Section, Mode

**Switcher**:
The primary interactive control enabling the visitor to transition between the two professional Tracks with corresponding aesthetic adaptations.
_Avoid_: Theme toggle, Tab bar

**Gateway**:
The initial interactive split-screen landing presentation allowing visitors to choose their primary professional journey (`Cinema Reel` vs `Data Engine`) upon first arrival.
_Avoid_: Splash screen, Welcome screen

### Content & Works

**Showcase Item**:
An individual work unit, case study, or production entry belonging to a Track, stored in Appwrite with metadata, metrics, and associated media.
_Avoid_: Project, Card, Post

**Video Artifact**:
A video showcase element embedded via YouTube (storing video ID, timestamp markers, aspect ratio, and thumbnail) rather than uploaded raw video files.
_Avoid_: Video upload, Media blob

**Theater Modal**:
The immersive, dark cinema modal launched when a visitor inspects a Video Artifact, providing high-definition YouTube playback, project breakdown, software tags, and timeline markers.
_Avoid_: Video popup, Lightbox

**Pipeline Blueprint**:
An architectural diagram, data flow schematic, or benchmark display representing a Big Data Showcase Item.
_Avoid_: Architecture image, Diagram screenshot

**Impact Metric**:
A quantifiable achievement metric (e.g., "10TB/day ingested", "3.2M views", "99.99% uptime") attached to a Showcase Item.
_Avoid_: Stat, Number

### Management

**Admin Dashboard**:
The authenticated internal portal within the application where the owner manages profile data, Showcase Items, skills, and configuration using Appwrite.
_Avoid_: CMS, Appwrite Console

**Inquiry**:
A direct contact message sent by a client or recruiter via the portfolio contact form, stored securely in Appwrite Databases.
_Avoid_: Lead, Form submission, Email

