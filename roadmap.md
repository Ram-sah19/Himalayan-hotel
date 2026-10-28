# Nepalese Hospitality Team — build roadmap

Master spec: `user-uploads://MASTER_PROMPT_Nepalese_Hospitality_Team_-_pasted.md`

## Done
- [x] Lovable Cloud enabled (DB, auth, storage)
- [x] Schema migration: user_roles/has_role, jobs, job_applications, cv_submissions, employer_inquiries, contact_messages, chatbot_faq, website_settings + RLS + GRANTs + demo seed
- [x] Email auth enabled; Google + Lovable sign-in configured
- [x] Private `cvs` storage bucket (10 MB) + storage policies
- [x] AI SDK + framer-motion installed; AI Elements primitives installed

## In progress
- [ ] Design system (styles.css tokens, fonts in __root)
- [ ] Public site: Home, Find Jobs (+ detail/apply), Submit CV, For Employers, About, FAQ, Contact
- [ ] AI chatbot (server route /api/chat + floating NHT AI Assistant widget)
- [ ] Auth page (email + Google + Lovable), sign-out hygiene
- [ ] Admin dashboard (/admin: overview, jobs, applications, CVs, inquiries, messages, chatbot KB, settings) behind admin role
- [ ] Server functions: jobs (public read), form submissions (validated writes), admin CRUD, settings
- [ ] SEO head() per route; responsive polish; footer w/ Velora Global credit
- [ ] Verify end-to-end (browser: submit forms, chat, admin flows), tests for filter rules
