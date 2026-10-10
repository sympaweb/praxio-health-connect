# Praxio Health Connect

Build the Gopraxio (Praxio) medical directory and doctor booking platform migrated from the Replit/GitHub project (sympaweb/Gopraxio).

Key features and architecture to implement:

1. **Brand & Style**:
   - Platform name: **GoPraxio** / **Praxio**
   - Clean, modern, trustworthy medical design system (clean blues, slate, crisp typography, responsive layout).

2. **Core Pages & Navigation**:
   - **Home page**:
     - Hero section with search bar (find by specialty, doctor name, condition, or location)
     - Visual enhancements: hero dot pattern, smooth SVG wave transitioning into stats counter
     - "How it works" 3-step section: (1. Search Doctors & Clinics -> 2. Read Verified Reviews -> 3. Book / Contact Instantly)
     - Specialty categories grid (Family Medicine, Pediatrics, Cardiology, Dermatology, Dentistry, etc.)
     - Featured and recently added doctors cards with ratings and specialties
     - Multi-column footer (Brand info, For Patients, For Doctors, Company links)
   - **Search & Filter Page**:
     - Interactive search with filters: Specialty, City / Location, Accepted Insurance, Telehealth availability, Rating, Languages.
     - Doctor cards with quick booking/contact buttons, badges (telehealth, claimed, verified).
   - **Doctor Profile Page**:
     - Comprehensive profile: Name, title, specialty, bio, credentials, office locations & hours
     - Service list with prices/descriptions
     - Accepted insurance providers list
     - Patient reviews and rating breakdown (with submit review form)
     - Direct appointment booking / contact CTA and telehealth indicators
     - FAQ section and clinic photo gallery
   - **Doctor Claim & Registration Flow**:
     - Flow for practitioners to claim an existing listing or register a new practice
     - Verification step and practice details submission
   - **Doctor / Practice Owner Portal**:
     - Dashboard to manage profile details, services, office hours, and review patient inquiries
   - **Admin Management**:
     - Simple admin dashboard to manage listings, approve claimed doctors, and manage directory data
   - **Specialty Directory & Hub Pages**:
     - Specialty index and localized specialty pages (e.g. Family Medicine in Amman / Jordan or designated regions)
   - **Patient Resources & Information**:
     - Blog / health articles section with category browsing and article reading view
     - Terms of Service, Privacy Policy, and SMS Consent pages

3. **Data & State**:
   - Provide realistic sample doctors (e.g., Dr. James Mitchell, MD - Family Medicine with comprehensive bio, 14 services, insurance list, awards, and reviews), sample reviews, specialties, and clinics so the platform is immediately functional and ready to explore.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/52f688c6-9a02-4048-912e-8dfbb0dd63a8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
