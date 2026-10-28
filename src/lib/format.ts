import { format, parseISO } from "date-fns";

export interface SalaryLike {
  salary_min?: number | null;
  salary_max?: number | null;
  salary_negotiable?: boolean | null;
}

const npr = (n: number) => n.toLocaleString("en-IN");

export function formatSalary(job: SalaryLike): string {
  if (job.salary_negotiable && !job.salary_min && !job.salary_max) return "Salary negotiable";
  if (job.salary_min && job.salary_max) return `NPR ${npr(job.salary_min)} – ${npr(job.salary_max)} monthly`;
  if (job.salary_min) return `From NPR ${npr(job.salary_min)} monthly`;
  if (job.salary_max) return `Up to NPR ${npr(job.salary_max)} monthly`;
  return "Salary negotiable";
}

export function formatNpr(n: number): string {
  return `NPR ${npr(n)}`;
}

export function formatDate(value?: string | null): string {
  if (!value) return "";
  try {
    return format(parseISO(value), "d MMM yyyy");
  } catch {
    return value;
  }
}

export function daysLeft(value?: string | null): number | null {
  if (!value) return null;
  try {
    const diff = parseISO(value).getTime() - Date.now();
    return Math.ceil(diff / 86_400_000);
  } catch {
    return null;
  }
}
