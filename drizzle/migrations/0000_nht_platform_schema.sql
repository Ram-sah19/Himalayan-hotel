-- ===== Roles & admin infrastructure =====
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;
revoke execute on function public.has_role(uuid, app_role) from anon;
grant execute on function public.has_role(uuid, app_role) to authenticated;

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can view own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Admins can view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ===== Jobs =====
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company_name text not null,
  category text not null,
  location text not null,
  employment_type text not null default 'Full-time',
  salary_min numeric,
  salary_max numeric,
  salary_negotiable boolean not null default false,
  experience_required text,
  description text not null,
  responsibilities jsonb not null default '[]'::jsonb,
  qualifications jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  deadline date,
  is_demo boolean not null default true,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.jobs to anon;
grant select, insert, update, delete on public.jobs to authenticated;
grant all on public.jobs to service_role;
alter table public.jobs enable row level security;
create policy "Anyone can view published jobs" on public.jobs for select to anon, authenticated using (is_published = true);
create policy "Admins can view all jobs" on public.jobs for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can create jobs" on public.jobs for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update jobs" on public.jobs for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete jobs" on public.jobs for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ===== Job applications (PII — server-validated writes, admin-only reads) =====
create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade,
  job_title text,
  full_name text not null,
  email text not null,
  phone text not null,
  current_location text not null,
  cover_letter text,
  cv_path text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant select, update on public.job_applications to authenticated;
grant all on public.job_applications to service_role;
alter table public.job_applications enable row level security;
create policy "Admins can view applications" on public.job_applications for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update applications" on public.job_applications for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== CV submissions =====
create table public.cv_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  current_location text not null,
  preferred_category text not null,
  years_experience text not null,
  preferred_location text not null,
  cv_path text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant select, update on public.cv_submissions to authenticated;
grant all on public.cv_submissions to service_role;
alter table public.cv_submissions enable row level security;
create policy "Admins can view CV submissions" on public.cv_submissions for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update CV submissions" on public.cv_submissions for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== Employer inquiries =====
create table public.employer_inquiries (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_person text not null,
  business_email text not null,
  phone text not null,
  industry text not null,
  recruitment_requirements text not null,
  vacancies int not null default 1,
  additional_details text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant select, update on public.employer_inquiries to authenticated;
grant all on public.employer_inquiries to service_role;
alter table public.employer_inquiries enable row level security;
create policy "Admins can view employer inquiries" on public.employer_inquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update employer inquiries" on public.employer_inquiries for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== Contact messages =====
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
grant select, update on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "Admins can view contact messages" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update contact messages" on public.contact_messages for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== Chatbot knowledge base =====
create table public.chatbot_faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default 'General',
  is_active boolean not null default true,
  is_suggested boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.chatbot_faq to anon;
grant select, insert, update, delete on public.chatbot_faq to authenticated;
grant all on public.chatbot_faq to service_role;
alter table public.chatbot_faq enable row level security;
create policy "Anyone can view active FAQ entries" on public.chatbot_faq for select to anon, authenticated using (is_active = true);
create policy "Admins can view all FAQ entries" on public.chatbot_faq for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can manage FAQ entries" on public.chatbot_faq for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== Website settings (configurable placeholders) =====
create table public.website_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
grant select on public.website_settings to anon;
grant select, update on public.website_settings to authenticated;
grant all on public.website_settings to service_role;
alter table public.website_settings enable row level security;
create policy "Anyone can read website settings" on public.website_settings for select to anon, authenticated using (true);
create policy "Admins can update website settings" on public.website_settings for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ===== updated_at trigger =====
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;
create trigger jobs_touch_updated_at before update on public.jobs for each row execute function public.touch_updated_at();

-- ===== Storage policies for the private cvs bucket =====
create policy "Anyone can upload CV files" on storage.objects for insert to anon, authenticated with check (bucket_id = 'cvs');
create policy "Admins can read CV files" on storage.objects for select to authenticated using (bucket_id = 'cvs' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete CV files" on storage.objects for delete to authenticated using (bucket_id = 'cvs' and public.has_role(auth.uid(), 'admin'));

-- ===== Seed: demo jobs (clearly marked demo content) =====
insert into public.jobs (title, company_name, category, location, employment_type, salary_min, salary_max, experience_required, description, responsibilities, qualifications, skills, deadline) values
('Front Office Manager', 'Himalayan Grand Hotel (Demo)', 'Front Office', 'Kathmandu', 'Full-time', 60000, 85000, '3+ years', 'Lead the front office team of a leading five-star property in Kathmandu, ensuring exceptional guest experiences from arrival to departure.', '["Supervise daily front desk, concierge and reservation operations","Resolve guest complaints and escalate issues appropriately","Coordinate with housekeeping and F&B for smooth arrivals","Train and mentor front office staff","Prepare occupancy and revenue reports"]', '["Bachelor degree in hotel management or related field","3+ years front office experience in a hotel","Excellent English and Nepali communication","Familiarity with PMS systems"]', '["Guest relations","Team leadership","PMS software","Conflict resolution","Scheduling"]', current_date + 30),
('Sous Chef', 'Lakeside Paradise Resort (Demo)', 'Culinary & Chef', 'Pokhara', 'Full-time', 70000, 95000, '4+ years', 'Support the executive chef in running a multi-outlet kitchen at a lakeside resort, focused on Nepali and continental cuisine.', '["Assist in menu planning and costing","Supervise kitchen sections during service","Maintain hygiene and food safety standards","Train junior cooks","Manage stock and supplier coordination"]', '["Diploma in culinary arts or equivalent experience","4+ years in a professional kitchen","Strong knowledge of food safety (HACCP)","Creative approach to seasonal menus"]', '["Nepali and continental cuisine","Food safety","Menu development","Stock management","Team training"]', current_date + 21),
('Restaurant Supervisor', 'Everest Bistro & Cafe (Demo)', 'Restaurant Management', 'Lalitpur', 'Full-time', 40000, 55000, '2+ years', 'Oversee daily restaurant service, staff scheduling and guest satisfaction in a busy bistro in Lalitpur.', '["Manage daily service operations and shift schedules","Handle guest feedback and complaints","Monitor stock and coordinate with suppliers","Ensure service standards and hygiene compliance","Train waiting staff"]', '["2+ years restaurant supervisory experience","Strong organizational and communication skills","Ability to work under pressure","Knowledge of POS systems"]', '["Team supervision","POS systems","Guest service","Stock control","Shift planning"]', current_date + 25),
('Housekeeping Attendant', 'Serene Valley Resort (Demo)', 'Housekeeping', 'Sauraha, Chitwan', 'Full-time', 22000, 28000, 'Entry level', 'Join the housekeeping team of a tranquil resort near Chitwan National Park, keeping guest rooms and public areas spotless.', '["Clean and prepare guest rooms to standards","Replenish amenities and linen","Report maintenance issues","Follow safety and hygiene procedures","Support public area cleaning"]', '["No formal experience required — training provided","Positive attitude and attention to detail","Physically fit and reliable","Basic communication skills"]', '["Attention to detail","Time management","Room cleaning standards","Teamwork"]', current_date + 18),
('Guest Relations Officer', 'Annapurna View Hotel (Demo)', 'Front Office', 'Pokhara', 'Full-time', 35000, 45000, '1+ year', 'Be the face of the hotel: welcome guests, handle special requests and ensure every stay at our Pokhara property is memorable.', '["Welcome and check in guests","Handle guest requests and special occasions","Coordinate with other departments","Log guest preferences in the PMS","Support VIP arrivals"]', '["1+ year in guest-facing hotel roles","Excellent English and Nepali","Well-groomed and personable","Comfortable with shift work"]', '["Guest relations","Communication","PMS software","Problem solving"]', current_date + 14),
('F&B Service Team Member', 'Thamel Grand Restaurant (Demo)', 'Food & Beverage', 'Kathmandu', 'Full-time', 25000, 32000, '1+ year', 'Deliver warm, attentive service in one of Kathmandu''s busiest restaurants, serving a diverse local and international clientele.', '["Take orders and serve food and beverages","Set tables and maintain service areas","Upsell specials and beverages","Follow food safety and hygiene standards","Assist in opening and closing duties"]', '["1+ year restaurant or cafe service experience","Friendly and energetic personality","Ability to stand for long shifts","Basic English communication"]', '["Customer service","Order taking","Beverage knowledge","Teamwork"]', current_date + 20),
('Hotel General Manager', 'Shangri-La Retreat & Spa (Demo)', 'Hotel Management', 'Nagarkot', 'Full-time', 150000, 200000, '8+ years', 'Provide overall leadership for a boutique mountain retreat, driving guest satisfaction, team culture and commercial performance.', '["Own P&L and budget performance","Lead department heads and staff development","Drive occupancy, RevPAR and guest scores","Ensure legal, safety and quality compliance","Represent the hotel with partners and owners"]', '["Degree in hospitality management","8+ years hotel leadership experience","Proven P&L responsibility","Fluent English and Nepali"]', '["P&L management","Leadership","Revenue management","Quality standards","Stakeholder relations"]', current_date + 40),
('Tour & Travel Consultant', 'Himalaya Trails Adventures (Demo)', 'Tourism & Travel', 'Kathmandu', 'Full-time', 30000, 40000, '2+ years', 'Design itineraries, advise travelers and coordinate trekking and tour operations for an established adventure travel company.', '["Respond to inquiries and prepare quotations","Design customized trek and tour packages","Coordinate guides, permits and logistics","Maintain relationships with partners","Support guests during operations"]', '["2+ years travel agency or tour operations experience","Knowledge of Nepal trekking routes and permits","Strong English communication","CRM and booking systems familiarity"]', '["Itinerary planning","Trekking permits","Customer advisory","Coordination","CRM systems"]', current_date + 28),
('Customer Service Representative', 'Himal Hospitality Services (Demo)', 'Customer Service', 'Kathmandu', 'Full-time', 28000, 35000, '1+ year', 'Handle inbound calls, emails and chat inquiries for hospitality clients with patience and professionalism.', '["Answer customer calls and emails","Resolve inquiries or escalate appropriately","Record interactions in the CRM","Meet quality and response-time targets","Provide feedback on recurring issues"]', '["1+ year customer service or call center experience","Excellent spoken English and Nepali","Clear written communication","Positive, patient attitude"]', '["Call handling","CRM systems","Written communication","Patience and empathy"]', current_date + 16),
('Executive Housekeeper', 'Buddha Garden Hotel (Demo)', 'Housekeeping', 'Bhaktapur', 'Full-time', 50000, 65000, '5+ years', 'Lead the housekeeping department of a heritage-style hotel in Bhaktapur, managing teams, budgets and standards.', '["Plan and supervise housekeeping operations","Prepare duty rosters and manage staffing","Control linen, amenity and cleaning budgets","Conduct room inspections","Coordinate with maintenance and front office"]', '["5+ years housekeeping experience with 2+ in supervision","Knowledge of cleaning chemicals and safety","Strong organizational skills","Basic computer literacy"]', '["Team leadership","Inspection standards","Budgeting","Roster planning","Chemical safety"]', current_date + 35),
('Commis Chef (Pastry)', 'Cherry Blossom Bakery & Cafe (Demo)', 'Culinary & Chef', 'Lalitpur', 'Full-time', 25000, 30000, '1+ year', 'Support the pastry team in producing cakes, desserts and viennoiserie for a popular bakery cafe in Lalitpur.', '["Prepare pastry items to recipes and standards","Assist with daily production planning","Maintain cleanliness of the pastry section","Learn new techniques from senior chefs","Support seasonal menu launches"]', '["1+ year pastry or bakery experience","Culinary qualification preferred","Precision and consistency","Willingness to learn"]', '["Pastry basics","Baking","Plating","Food hygiene"]', current_date + 12),
('Barista', 'Lakeside Coffee House (Demo)', 'Food & Beverage', 'Pokhara', 'Part-time', 20000, 24000, '0-1 year', 'Craft espresso drinks and welcome regulars at a cozy lakeside cafe, with flexible shifts for students and career starters.', '["Prepare espresso-based drinks","Operate grinders and coffee machines","Serve customers at counter and tables","Keep the cafe clean and stocked","Support latte art and seasonal specials"]', '["Passion for coffee; training provided","Customer-friendly attitude","Morning or evening shift availability","Basic English and Nepali"]', '["Espresso preparation","Customer service","Machine operation","Latte art (preferred)"]', current_date + 10);

-- ===== Seed: chatbot knowledge base =====
insert into public.chatbot_faq (question, answer, category, is_suggested, display_order) values
('How can I apply for a job?', 'Applying is simple:

1. Open **Find Jobs** and browse or search the listings.
2. Click a job to view the full details.
3. Press **Apply Now** and complete the application form — full name, email, phone number, current location, your CV and an optional cover letter.
4. Submit, and you will see a confirmation on screen.

The recruitment team reviews every application and will reach out if your profile matches.', 'Job Applications', true, 1),
('How do I submit my CV?', 'You do not need a specific vacancy to join our talent pool. Go to the **Submit CV** page and share your details — name, contact information, location, preferred job category, years of experience and your CV file (PDF, DOC or DOCX). Employers looking for your profile can then be matched with you.', 'CV Submission', true, 2),
('What documents are required for applications?', 'For a job application you need an up-to-date CV (PDF, DOC or DOCX, up to 10 MB). A cover letter is optional but recommended. If an employer requests further documents such as citizenship, academic certificates or experience letters, the recruitment team will ask you at a later stage — you do not need to upload them with the initial application.', 'Job Applications', true, 3),
('How can employers post vacancies?', 'Employers can use the **For Employers** page and submit a recruitment inquiry with company details, industry, requirements and the number of vacancies. The recruitment team then reviews the request, discusses the role profile and publishes the vacancy or starts a targeted search on the employer''s behalf.', 'Employer Services', true, 4),
('How can I contact your recruitment team?', 'You can reach the team through the **Contact** page — send a message via the contact form and it goes straight to the recruitment team''s inbox. Phone and email details are shown on that page, and the AI assistant can help you navigate the site at any time.', 'General Support', true, 5),
('How do I check my application status?', 'Application status updates are handled personally by the recruitment team. If you have applied, wait for a call or email from the team; if it has been a while, send a message through the **Contact** page mentioning the role and date you applied, and the team will follow up.', 'Job Applications', true, 6),
('Can I apply for multiple jobs?', 'Yes — there is no limit. Apply to every vacancy that genuinely matches your skills and experience. Each application is reviewed on its own merits. To increase your chances, tailor your CV and cover letter to each role.', 'Job Applications', false, 7),
('What file formats are accepted for CV upload?', 'CVs can be uploaded as PDF, DOC or DOCX files up to 10 MB. If your CV is in another format, convert it to PDF first — it preserves formatting and is the easiest for recruiters to read.', 'CV Submission', false, 8),
('Do I have to pay to use this platform?', 'The website does not list any service fees for job seekers. If you ever receive a message asking for payment in connection with an application, treat it with caution and report it to the recruitment team through the Contact page.', 'General Support', false, 9),
('How long does the recruitment process take?', 'Timelines vary by role and employer. Shortlisted candidates are usually contacted within a few weeks of applying. If an employer needs someone urgently, the process can move faster. The recruitment team keeps applicants informed at each stage.', 'Job Applications', false, 10);

-- ===== Seed: website settings (configurable placeholders — update in admin) =====
insert into public.website_settings (key, value) values
('contact_email', 'Email address not yet configured'),
('contact_phone', 'Phone number not yet configured'),
('contact_address', 'Office address not yet configured'),
('contact_map_note', 'Map location to be configured'),
('stats_opportunities', '120'),
('stats_job_seekers', '450'),
('stats_employers', '60'),
('stats_connections', '300'),
('social_facebook', ''),
('social_instagram', ''),
('social_linkedin', '');
