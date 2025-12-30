import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email or username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const VerifyEmailSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const UsernameSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

const validateSocialUrl = (value) => {
  const urlStr = value.startsWith("http") ? value : `https://${value}`;

  try {
    const url = new URL(urlStr);
    const dotCount = (url.hostname.match(/\./g) || []).length;

    if (url.hostname.startsWith("www")) {
      return dotCount >= 2;
    } else {
      return dotCount >= 1;
    }
  } catch {
    return false;
  }
};

const socialUrlSchema = (message) =>
  z
    .string()
    .min(1, message)
    .transform((val) => (val.startsWith("http") ? val : `https://${val}`))
    .refine(validateSocialUrl, { message });

const optionalSocialUrl = (message) =>
  z.preprocess(
    (val) => (val === "" ? undefined : val),
    socialUrlSchema(message).optional(),
  );

export const CreateCommunitySchema = z.object({
  communityName: z.string().min(1, "Community name is required"),
  communityUsername: z.string().min(1, "Community username is required"),
  websitePage: socialUrlSchema("Enter a valid Website URL"),
  githubPage: socialUrlSchema("Enter a valid GitHub URL"),
  twitterPage: socialUrlSchema("Enter a valid Twitter URL"),
  instagramPage: socialUrlSchema("Enter a valid Instagram URL"),
  communityDescription: z.string().optional(),
  message: z.string().optional(),
});

const TaskSchema = z
  .object({
    type: z.string().min(1, "Task type is required"),
    twitterUrl: socialUrlSchema("Enter a valid Twitter URL").optional(),
    tweetUrl: socialUrlSchema("Enter a valid Tweet URL").optional(),
  })
  .superRefine((task, ctx) => {
    if (task.type === "follow_twitter") {
      if (!task.twitterUrl || task.twitterUrl.trim() === "") {
        ctx.addIssue({
          path: ["twitterUrl"],
          message: "Twitter URL is required",
          code: "custom",
        });
      }
    }

    if (task.type === "comment_twitter") {
      if (!task.tweetUrl || task.tweetUrl.trim() === "") {
        ctx.addIssue({
          path: ["tweetUrl"],
          message: "Tweet URL is required",
          code: "custom",
        });
      }
    }
  });

export const CreateGrowthQuestSchema = z
  .object({
    questTitle: z.string().min(1, "Quest title is required"),
    rewardType: z.string().min(1, "Reward type is required"),
    tokenContract: z.string().optional().nullable(),
    numberOfWinners: z.number().nullable(),
    pointsPerWinner: z.number().nullable(),
    winnerSelectionMethod: z
      .string()
      .min(1, "Winner selection method is required"),
    rewardMode: z.enum(["Overall Reward", "Individual Task Reward"]).nullable(),
    runContinuously: z.boolean().default(false),
    makeConcurrent: z.boolean().default(false),
    startDate: z.date().nullable(),
    endDate: z.date().optional().nullable(),
    tasks: z.array(TaskSchema).min(1, "At least one task is required"),
  })
  .superRefine((data, ctx) => {
    if (data.numberOfWinners === null) {
      ctx.addIssue({
        path: ["numberOfWinners"],
        message: "Number of winners is required",
        code: "custom",
      });
    }

    if (data.pointsPerWinner === null) {
      ctx.addIssue({
        path: ["pointsPerWinner"],
        message: "Points per winner is required",
        code: "custom",
      });
    }

    if (!data.startDate) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date is required",
        code: "custom",
      });
    }

    if (data.startDate && data.startDate < new Date()) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date must be greater than or equal today",
        code: "custom",
      });
    }

    if (data.rewardType === "token") {
      if (!data.tokenContract || data.tokenContract.trim() === "") {
        ctx.addIssue({
          path: ["tokenContract"],
          message: "Token contract is required",
          code: "custom",
        });
      }
    }

    if (!data.runContinuously) {
      if (!data.endDate) {
        ctx.addIssue({
          path: ["endDate"],
          message: "End date is required",
          code: "custom",
        });
      }
    }

    if (
      !data.runContinuously &&
      data.endDate &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        path: ["endDate"],
        message: "End date must be greater than start date",
        code: "custom",
      });
    }

    if (!data.rewardMode) {
      ctx.addIssue({
        path: ["rewardMode"],
        message: "Reward mode is required",
        code: "custom",
      });
    }
  });

const OnChainTaskSchema = z.object({
  type: z.string().min(1, "Task type is required"),
  description: z.string().min(1, "Task description is required"),
  link: optionalSocialUrl("Enter a valid link"),
});

export const CreateOnChainQuestSchema = z
  .object({
    questTitle: z.string().min(1, "Quest title is required"),
    contractAddress: z.string().min(1, "Contract address is required"),
    rewardType: z.string().min(1, "Reward type is required"),
    tokenContract: z.string().optional().nullable(),
    numberOfWinners: z.number().nullable(),
    pointsPerWinner: z.number().nullable(),
    winnerSelectionMethod: z
      .string()
      .min(1, "Winner selection method is required"),
    rewardMode: z.enum(["Overall Reward", "Individual Task Reward"]).nullable(),
    verificationMode: z
      .enum(["Contract Invocation", "Observe Account Calls"])
      .nullable(),
    runContinuously: z.boolean().default(false),
    makeConcurrent: z.boolean().default(false),
    startDate: z.date().nullable(),
    endDate: z.date().optional().nullable(),
    tasks: z.array(OnChainTaskSchema).min(1, "At least one task is required"),
  })
  .superRefine((data, ctx) => {
    if (data.numberOfWinners === null) {
      ctx.addIssue({
        path: ["numberOfWinners"],
        message: "Number of winners is required",
        code: "custom",
      });
    }

    if (data.pointsPerWinner === null) {
      ctx.addIssue({
        path: ["pointsPerWinner"],
        message: "Points per winner is required",
        code: "custom",
      });
    }

    if (!data.startDate) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date is required",
        code: "custom",
      });
    }

    if (data.startDate && data.startDate < new Date()) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date must be greater than or equal today",
        code: "custom",
      });
    }

    if (data.rewardType === "token") {
      if (!data.tokenContract || data.tokenContract.trim() === "") {
        ctx.addIssue({
          path: ["tokenContract"],
          message: "Token contract is required",
          code: "custom",
        });
      }
    }

    if (!data.runContinuously) {
      if (!data.endDate) {
        ctx.addIssue({
          path: ["endDate"],
          message: "End date is required",
          code: "custom",
        });
      }
    }

    if (
      !data.runContinuously &&
      data.endDate &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        path: ["endDate"],
        message: "End date must be greater than start date",
        code: "custom",
      });
    }

    if (!data.rewardMode) {
      ctx.addIssue({
        path: ["rewardMode"],
        message: "Reward mode is required",
        code: "custom",
      });
    }

    if (!data.verificationMode) {
      ctx.addIssue({
        path: ["verificationMode"],
        message: "Verification mode is required",
        code: "custom",
      });
    }
  });
