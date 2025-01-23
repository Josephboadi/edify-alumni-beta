import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(12, "Phone Number must not be more than 12 digits"),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  school: z.string().min(1, {
    message: "School is required",
  }),
  year: z.string().min(1, {
    message: "Year is required",
  }),
});

export const JobApplicationSchema = z.object({
  jobtitle: z.string().min(1, {
    message: "Job title is required",
  }),
  company: z.string().min(1, {
    message: "Company is required",
  }),
  type: z.string().min(1, {
    message: "Job type is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  cvfileUrl: z.string().min(1, {
    message: "Upload your CV.",
  }),
  coverLetterFileUrl: z.string().optional(),
});

export const ScholarshipApplicationSchema = z.object({
  scholarshiptitle: z.string().min(1, {
    message: "Job title is required",
  }),
  certificateFileUrl: z.string().min(1, {
    message: "Upload your school certificate.",
  }),
  applicationLetterFileUrl: z.string().min(1, {
    message: "Upload your application letter.",
  }),
  recommendationLetterFileUrl: z.string().min(1, {
    message: "Upload a letter of recommendation.",
  }),
});

export const ServiceRequestSchema = z.object({
  requesttitle: z.string().min(1, {
    message: "Request title is required",
  }),
  reason: z.string().min(1, {
    message: "Reason is required",
  }),
  additionalNote: z.string().optional(),
});

export const SubscribeSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const CommentSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment is required",
  }),
});

export const ContinentSchema = z.object({
  continent_name: z.string().min(1, {
    message: "Continent name is required",
  }),
});

export const SubRegionSchema = z.object({
  subregion_name: z.string().min(1, {
    message: "Sub region name is required",
  }),
  continent_id: z.string().min(1, {
    message: "Continent id is required",
  }),
});

export const CountrySchema = z.object({
  country_name: z.string().min(1, {
    message: "Country name is required",
  }),
  country_code: z.string().min(1, {
    message: "Country code is required",
  }),
  subreion_id: z.string().min(1, {
    message: "Sub Region id is required",
  }),
  is_edify_country: z.boolean().default(true),
});

export const SchoolSchema = z.object({
  school_name: z.string().min(1, {
    message: "School name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  phone_numbers: z.array(z.object({ number: z.string() })),
  country_id: z.string().min(1, {
    message: "Country is required",
  }),
});

export const DynamicReportFormSchema = z.object({
  continent: z.optional(z.string()),
  subRegion: z.optional(z.string()),
  country: z.optional(z.string()),
  school: z.optional(z.string()),
  startDate: z.date({
    required_error: "Please select a start date",
    invalid_type_error: "That's not a date!",
  }),
  endDate: z.date({
    required_error: "Please select an end date",
    invalid_type_error: "That's not a date!",
  }),
});

export const EventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  information: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  eventLocation: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  image: z.string().url(),
  eventStartTime: z.date(),
  eventEndTime: z.date(),
  publishDate: z.date(),
  eventDate: z.date(),
  // categoryId: z.string(),
  hashTags: z.array(z.object({ hash: z.string() })),
  isEventDay: z.boolean(),
  // url: z.string().url(),
});

export const JobFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  categoryName: z.string().min(1, "Job category is required."),
  information: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  publishDate: z.date(),
  jobType: z.string(),
  company: z.string(),
  pay: z.string(),
  jobDescription: z.optional(
    z.array(z.object({ id: z.number(), info: z.string() }))
  ),
  jobSpecification: z.array(z.object({ id: z.number(), info: z.string() })),
});

export const NewJobFormSchema = z.object({
  jobTitle: z.string(),
  country_id: z.string().uuid(),
  jobType: z.string(),
  jobCategory: z.string(),
  minimumSalary: z.number(),
  maximumSalary: z.number(),
  location: z.string(),
  infomation: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  description: z.array(z.string()),
  sepcification: z.array(z.optional(z.string())),
  salaryCurrency: z.string(),
});

export const ProcessJobFormSchema = z.object({
  application_id: z.string().uuid(),
  status: z.number(),
  processComment: z.string(),
});

export const ScholarshipFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  country_id: z.string().uuid(),
  infomation: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  cover_image_url: z.string().url(),
  // publishDate: z.date(),
});

export const ProcessScholarshipFormSchema = z.object({
  application_id: z.string().uuid(),
  status: z.number(),
  processComment: z.string(),
});

export const DiscussionFormSchema = z.object({
  topic: z.string().min(3, "Title must be at least 3 characters"),
  createdBy: z.string(),
  hashTags: z.array(z.object({ hash: z.string() })),
});

export const CommentFormSchema = z.object({
  comment: z.string().min(3, "Title must be at least 3 characters"),
  questionId: z.string(),
  createdBy: z.string(),
});

export const HeroFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string().url(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  // createdBy: z.string(),
});

export const BulkEmailFormSchema = z.object({
  subject: z.string().min(3, "Email Subject must be at least 3 characters"),
  content: z.string().min(3, "Email content must be at least 3 characters"),
  // .max(400, "Email content must be less than 400 characters"),
  // createdBy: z.string(),
});

export const BriefNewsFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  images: z.array(z.string().url()),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  // createdBy: z.string(),
});

export const SponsorsFormSchema = z.object({
  name: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string().url(),
  // createdBy: z.string(),
});

type JobSpecification = {
  id: number;
  info: string;
};

type JobDescription = {
  id: number;
  info: string;
};

export type Job = {
  id: string;
  categoryName: string;
  title: string;
  jobType: string;
  pay: string;
  company: string;
  location: string;
  publishDate: string;
  information: string;
  jobDescription: JobDescription[];
  jobSpecification: JobSpecification[];
};

export type JobData = {
  id: string;
  title: string;
  categoryName: string;
  jobType: string;
  pay: string;
  company: string;
  location: string;
  publishDate: string;
  information: string;
  jobDescription: JobDescription[];
  jobSpecification: JobSpecification[];
};

// export type JobCategory = {
//   key: number;
//   categoryName: string;
//   List: Job[];
// };

export type JobListData = Job[];

export type ScholarshipData = {
  key: number;
  image: string;
  title: string;
  publishDate: string;
  information: string;
};

export type ScholarshipListData = ScholarshipData[];

export type EventData = {
  key: number;
  image: string;
  title: string;
  hashTags: { hash: string }[];
  eventStartTime: Date;
  eventEndTime: Date;
  publishDate: Date;
  eventDate: Date;
  eventLocation: string;
  isEventDay: boolean;
  information: string;
};

export type EventListData = EventData[];

interface Comment {
  id: string;
  isMyComment: boolean;
  comment: string;
  createdBy: string;
  image: string;
  createdAt: string;
  createdTime: string;
}

export interface DiscussionData {
  key: number;
  topic: string;
  createdBy: string;
  image: string;
  createdAt: string;
  createdTime: string;
  hashTags: { hash: string }[];
  comments: Comment[];
}

export type DiscussionListData = DiscussionData[];

export type ProfileData = {
  id: number;
  status: string;
  bio: {
    name: string;
    phoneNumber: string;
    email: string;
    image: string;
    country: string;
    region: string;
    homeAddress: string;
    postalAddress: string;
  };
  education: {
    school: string;
    completionYear: string;
  }[];
  certificates: {
    title: string;
  }[];
  employments: {
    company: string;
    position: string;
    period: string;
  }[];
  scholarships: {
    institution: string;
    status: string;
  }[];
  jobApplications: {
    jobTitle: string;
    company: string;
    status: string;
  }[];
  services: {
    request: string;
    status: string;
  }[];
};

export type HeroData = {
  key: number;
  image: string;
  title: string;
  description: string;
};

export type AboutData = {
  key: number;
  paragraph: string;
}[];

export type BriefNewsData = {
  key: number;
  images: string[];
  // images: {
  //   key: number;
  //   image: string;
  // }[];
  title: string;
  description: string;
};

export type TopAlumniData = {
  key: number;
  image: string;
  name: string;
  company: string;
  position: string;
  info: string;
}[];

export type SponsorData = {
  key: number;
  name: string;
  image: string;
};

export type JobCatData = {
  key: number;
  image: string;
  title: string;
}[];

export type CountryData = {
  name: string;
  code: string;
}[];

export type SchoolData = {
  id: number;
  name: string;
}[];

export type YearData = {
  name: string;
  value: string;
}[];

export type JobTypeData = {
  name: string;
  value: string;
}[];

export type CurrencyData = {
  name: string;
  value: string;
}[];

export type StatusData = {
  name: string;
  value: number;
}[];

export type UserInfoData = {
  id: string;
  user_id: string;
  name: string;
  phone_numbers: string;
  email: string;
  address: string | null;
  date_added: string | null;
  status: number;
  date_activated: string | null;
  year: string;
  school_id: string;
  country_of_res_id: string;
  emailVerified: string;
  image: string | null;
  imageObj: string | null;
  password: string;
  role: string;
  isTwoFactorEnabled: boolean;
  user_employment: any[];
  user_education: any[];
  user_certificate: any[];
  school: {
    id: number;
    school_id: string;
    country_id: string;
    school_name: string;
    phone_numbers: string[];
    address: string;
    status: number;
    date_added: string;
  };
  country: {
    id: number;
    country_id: string;
    country_name: string;
    date_created: string;
    country_code: string;
    status: number;
    is_edify_country: number;
    subreion_id: string;
  };
  job_applications?: {
    id: number;
    application_id: string;
    date_added: string;
    status: number;
    user_id: string;
    job_id: string;
    cvUrl: string;
    coverPageUrl: string;
    processComment: string;
    user_process_id: string;
    date_processed: string;
    job: {
      id: number;
      job_id: string;
      jobTitle: string;
      status: number;
      country_id: string;
      jobType: string;
      jobCategory: string;
      minimumSalary: string;
      maximumSalary: string;
      location: string;
      infomation: string;
      description: string[];
      sepcification: string[];
      numberOfApplication: number;
      numberOfConfirmation: number;
      numberOfPending: number;
      numberOfDeclined: number;
      date_added: string;
      salaryCurrency: string;
    };
  }[];
  scholarships?: {
    id: number;
    application_id: string;
    date_added: string;
    status: number;
    user_id: string;
    scholarship_id: string;
    certificate_url: string;
    application_letter_url: string;
    recommendation_letter_url: string;
    processComment: string | null;
    user_process_id: string | null;
    date_processed: string;
    scholarship: {
      id: number;
      scholarship_id: string;
      title: string;
      status: number;
      country_id: string;
      infomation: string;
      numberOfApplication: number;
      numberOfConfirmation: number;
      numberOfPending: number;
      numberOfDeclined: number;
      date_added: string;
      cover_image_url: string;
    };
  }[];
};

export type JobInfoData = {
  id: number;
  job_id: string;
  jobTitle: string;
  status: number;
  country_id: string;
  jobType: string;
  jobCategory: string;
  minimumSalary: string;
  maximumSalary: string;
  location: string;
  infomation: string;
  description: string[];
  sepcification: string[];
  numberOfApplication: number;
  numberOfConfirmation: number;
  numberOfPending: number;
  numberOfDeclined: number;
  date_added: string;
  salaryCurrency: string;
  country: {
    id: number;
    country_id: string;
    country_name: string;
    date_created: string;
    country_code: string;
    status: number;
    is_edify_country: number;
    subreion_id: string;
  };
  applications?: JobApplicationsData[];
};

export type JobApplicationsData = {
  id: number;
  application_id: string;
  date_added: string;
  status: number;
  user_id: string;
  job_id: string;
  cvUrl: string;
  coverPageUrl: string;
  user: {
    id: string;
    user_id: string;
    name: string;
    phone_numbers: string;
    email: string;
    address: string | null;
    date_added: string | null;
    status: number;
    date_activated: string | null;
    year: string;
    school_id: string;
    country_of_res_id: string;
    emailVerified: string;
    image: string | null;
    imageObj: string | null;
    password: string;
    role: string;
    isTwoFactorEnabled: boolean;
  };
  job: {
    id: number;
    job_id: string;
    jobTitle: string;
    status: number;
    country_id: string;
    jobType: string;
    jobCategory: string;
    minimumSalary: string;
    maximumSalary: string;
    location: string;
    infomation: string;
    description: string[];
    sepcification: string[];
    numberOfApplication: number;
    numberOfConfirmation: number;
    numberOfPending: number;
    numberOfDeclined: number;
    date_added: string;
    salaryCurrency: string;
  };
};

export type ScholarshipInfoData = {
  id: number;
  scholarship_id: string;
  title: string;
  status: number;
  country_id: string;
  infomation: string;
  numberOfApplication: number;
  numberOfConfirmation: number;
  numberOfPending: number;
  numberOfDeclined: number;
  date_added: string;
  cover_image_url: string;
  country: {
    id: number;
    country_id: string;
    country_name: string;
    date_created: string;
    country_code: string;
    status: number;
    is_edify_country: number;
    subreion_id: string;
  };
  applications?: ScholarshipApplicationsData[];
};

export type ScholarshipApplicationsData = {
  id: number;
  application_id: string;
  date_added: string;
  status: number;
  user_id: string;
  scholarship_id: string;
  certificate_url: string;
  application_letter_url: string;
  recommendation_letter_url: string;
  processComment: string | null;
  user_process_id: string | null;
  date_processed: string;
  user: {
    id: string;
    user_id: string;
    name: string;
    phone_numbers: string;
    email: string;
    address: string | null;
    date_added: string | null;
    status: number;
    date_activated: string | null;
    year: string;
    school_id: string;
    country_of_res_id: string;
    emailVerified: string;
    image: string | null;
    imageObj: string | null;
    password: string;
    role: string;
    isTwoFactorEnabled: boolean;
  };
  scholarship: {
    id: number;
    scholarship_id: string;
    title: string;
    status: number;
    country_id: string;
    infomation: string;
    numberOfApplication: number;
    numberOfConfirmation: number;
    numberOfPending: number;
    numberOfDeclined: number;
    date_added: string;
    cover_image_url: string;
  };
};
