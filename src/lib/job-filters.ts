export interface JobDTO {
  id: string;
  title: string;
  company_name: string;
  category: string;
  location: string;
  employment_type: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_negotiable: boolean;
  experience_required: string | null;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  deadline: string | null;
  is_demo: boolean;
  is_published: boolean;
  created_at: string;
}

export interface JobFilterState {
  q?: string;
  category?: string;
  location?: string;
  employmentType?: string;
  experience?: string; // any | entry | 1 | 3 | 5
  salaryBand?: string; // any | lt25k | 25k50k | 50k100k | 100kplus
  sort?: string; // newest | salary-desc
}

/** Extract the minimum years of experience implied by a free-text requirement. */
export function parseYears(required?: string | null): number | null {
  if (!required) return null;
  const text = required.toLowerCase();
  if (text.includes("entry")) return 0;
  const match = text.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

/** Does a job's experience requirement fall within the selected experience bucket? */
export function matchesExperience(required: string | null | undefined, bucket: string): boolean {
  if (!bucket || bucket === "any") return true;
  const years = parseYears(required);
  if (bucket === "entry") return years !== null && years <= 0.5;
  const limit = parseFloat(bucket);
  if (Number.isNaN(limit)) return true;
  return years !== null && years <= limit;
}

const BANDS: Record<string, (min: number, max: number) => boolean> = {
  lt25k: (min) => min < 25_000,
  "25k50k": (min, max) => min < 50_000 && max >= 25_000,
  "50k100k": (min, max) => min < 100_000 && max >= 50_000,
  "100kplus": (_min, max) => max >= 100_000,
};

export function matchesSalaryBand(
  min?: number | null,
  max?: number | null,
  band?: string,
): boolean {
  if (!band || band === "any") return true;
  const low = min ?? max ?? 0;
  const high = max ?? min ?? 0;
  const test = BANDS[band];
  return test ? test(low, high) : true;
}

export function filterAndSortJobs(jobs: JobDTO[], filters: JobFilterState): JobDTO[] {
  const q = filters.q?.trim().toLowerCase();
  const filtered = jobs.filter((job) => {
    if (q) {
      const haystack = `${job.title} ${job.company_name} ${job.description} ${job.skills.join(" ")}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.category && filters.category !== "any" && job.category !== filters.category) return false;
    if (filters.location && filters.location !== "any" && job.location !== filters.location) return false;
    if (filters.employmentType && filters.employmentType !== "any" && job.employment_type !== filters.employmentType) return false;
    if (!matchesExperience(job.experience_required, filters.experience ?? "any")) return false;
    if (!matchesSalaryBand(job.salary_min, job.salary_max, filters.salaryBand ?? "any")) return false;
    return true;
  });

  if (filters.sort === "salary-desc") {
    filtered.sort((a, b) => (b.salary_max ?? b.salary_min ?? 0) - (a.salary_max ?? a.salary_min ?? 0));
  } else {
    filtered.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  }
  return filtered;
}
