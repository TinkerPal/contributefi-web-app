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

const numberOrNull = z.preprocess(
  (val) => (val === undefined || Number.isNaN(val) ? null : val),
  z.number().nullable(),
);

const GrowthTaskSchema = z
  .object({
    type: z.string().min(1, "Task type is required"),
    pointsPerTask: numberOrNull,
    tokensPerTask: numberOrNull,
    twitterUrl: socialUrlSchema("Enter a valid Twitter URL").optional(),
    tweetUrl: socialUrlSchema("Enter a valid Tweet URL").optional(),
    keywordValidation: z.string().optional(),
    discordLink: socialUrlSchema("Enter a valid Discord link").optional(),
    channelId: z.string().optional(),
    telegramLink: socialUrlSchema("Enter a valid Telegram link").optional(),
    telegramGroupLink: socialUrlSchema(
      "Enter a valid Telegram group link",
    ).optional(),
  })
  .superRefine((task, ctx) => {
    if (task.type === "follow_on_twitter") {
      if (!task.twitterUrl || task.twitterUrl.trim() === "") {
        ctx.addIssue({
          path: ["twitterUrl"],
          message: "Twitter URL is required",
          code: "custom",
        });
      }
    }

    if (task.type === "comment_on_twitter") {
      if (!task.tweetUrl || task.tweetUrl.trim() === "") {
        ctx.addIssue({
          path: ["tweetUrl"],
          message: "Tweet URL is required",
          code: "custom",
        });
      }
    }

    if (task.type === "like_tweet") {
      if (!task.tweetUrl || task.tweetUrl.trim() === "") {
        ctx.addIssue({
          path: ["tweetUrl"],
          message: "Tweet URL is required",
          code: "custom",
        });
      }
    }

    if (task.type === "post_on_discord") {
      if (!task.discordLink || task.discordLink.trim() === "") {
        ctx.addIssue({
          path: ["discordLink"],
          message: "Discord link is required",
          code: "custom",
        });
      }
    }

    if (task.type === "post_on_discord") {
      if (!task.channelId || task.channelId.trim() === "") {
        ctx.addIssue({
          path: ["channelId"],
          message: "Channel ID is required",
          code: "custom",
        });
      }
    }

    if (task.type === "join_telegram_channel") {
      if (!task.telegramLink || task.telegramLink.trim() === "") {
        ctx.addIssue({
          path: ["telegramLink"],
          message: "Telegram Link is required",
          code: "custom",
        });
      }
    }

    if (task.type === "post_on_telegram_group") {
      if (!task.telegramGroupLink || task.telegramGroupLink.trim() === "") {
        ctx.addIssue({
          path: ["telegramGroupLink"],
          message: "Telegram Group Link is required",
          code: "custom",
        });
      }
    }
  });

// export const CreateGrowthQuestSchema = z.object({
//   questTitle: z.string().min(1, "Quest title is required"),
// });

export const CreateGrowthQuestSchema = z
  .object({
    questTitle: z.string().min(1, "Quest title is required"),
    rewardType: z.string().min(1, "Reward type is required"),
    tokenContract: z.string().optional().nullable(),
    numberOfWinners: numberOrNull,
    pointsPerWinner: numberOrNull,
    tokensPerWinner: numberOrNull,
    winnerSelectionMethod: z
      .string()
      .min(1, "Winner selection method is required"),
    rewardMode: z.enum(["Overall Reward", "Individual Task Reward"]).nullable(),
    runContinuously: z.boolean().default(false),
    makeConcurrent: z.boolean().default(false),
    startDate: z.date().nullable(),
    endDate: z.date().optional().nullable(),
    tasks: z.array(GrowthTaskSchema).min(1, "At least one task is required"),
  })
  .superRefine((data, ctx) => {
    if (data.numberOfWinners === null) {
      ctx.addIssue({
        path: ["numberOfWinners"],
        message: "Number of winners is required",
        code: "custom",
      });
    } else if (data.numberOfWinners < 0) {
      ctx.addIssue({
        path: ["numberOfWinners"],
        message: "Number of winners cannot be negative",
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

    if (!data.startDate) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date is required",
        code: "custom",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(data.startDate);
    startDate.setHours(0, 0, 0, 0);

    if (startDate < today) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Start date must be greater than or equal to today",
        code: "custom",
      });
    }

    if (data.rewardType === "Token") {
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

    if (data.rewardMode === "Individual Task Reward") {
      data.tasks.forEach((task, index) => {
        if (data.rewardType === "Points" && task.pointsPerTask == null) {
          ctx.addIssue({
            path: ["tasks", index, "pointsPerTask"],
            message: "Points per task is required",
            code: "custom",
          });
        } else if (task.pointsPerTask < 0) {
          ctx.addIssue({
            path: ["tasks", index, "pointsPerTask"],
            message: "Points per task cannot be negative",
            code: "custom",
          });
        }

        if (data.rewardType === "Token" && task.tokensPerTask == null) {
          ctx.addIssue({
            path: ["tasks", index, "tokensPerTask"],
            message: "Tokens per task is required",
            code: "custom",
          });
        } else if (task.tokensPerTask < 0) {
          ctx.addIssue({
            path: ["tasks", index, "tokensPerTask"],
            message: "Tokens per task cannot be negative",
            code: "custom",
          });
        }
      });
    }

    if (data.rewardMode === "Overall Reward") {
      if (data.rewardType === "Points" && data.pointsPerWinner == null) {
        ctx.addIssue({
          path: ["pointsPerWinner"],
          message: "Points per winner is required",
          code: "custom",
        });
      } else if (data.pointsPerWinner < 0) {
        ctx.addIssue({
          path: ["pointsPerWinner"],
          message: "Points per winner cannot be negative",
          code: "custom",
        });
      }

      if (data.rewardType === "Token" && data.tokensPerWinner == null) {
        ctx.addIssue({
          path: ["tokensPerWinner"],
          message: "Tokens per winner is required",
          code: "custom",
        });
      } else if (data.tokensPerWinner < 0) {
        ctx.addIssue({
          path: ["tokensPerWinner"],
          message: "Tokens per winner cannot be negative",
          code: "custom",
        });
      }
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

const LinkSchema = z.object({
  name: z.string().min(1, "Link name is required"),
  url: socialUrlSchema("Enter a valid URL"),
});

const TechnicalTaskSchema = z.object({
  description: z.string().min(1, "Task description is required"),
  instruction: z.string().min(1, "Task instruction is required"),
  links: z.array(LinkSchema).max(5, "Maximum 5 links"),
});

export const CreateTechnicalQuestSchema = z
  .object({
    questTitle: z.string().min(1, "Quest title is required"),
    questType: z.string().min(1, "Quest type is required"),
    rewardType: z.string().min(1, "Reward type is required"),
    tokenContract: z.string().optional().nullable(),
    // numberOfWinners: z.number().nullable(),
    // pointsPerWinner: z.number().nullable(),
    // winnerSelectionMethod: z
    //   .string()
    //   .min(1, "Winner selection method is required"),
    rewardMode: z.enum(["Overall Reward", "Individual Task Reward"]).nullable(),
    questGoal: z.enum(["Project-based", "Recruit Candidates"]).nullable(),
    // runContinuously: z.boolean().default(false),
    makeConcurrent: z.boolean().default(false),
    // startDate: z.date().nullable(),
    // endDate: z.date().optional().nullable(),
    tasks: z.array(TechnicalTaskSchema).min(1, "At least one task is required"),
  })
  .superRefine((data, ctx) => {
    // if (data.numberOfWinners === null) {
    //   ctx.addIssue({
    //     path: ["numberOfWinners"],
    //     message: "Number of winners is required",
    //     code: "custom",
    //   });
    // }

    // if (data.pointsPerWinner === null) {
    //   ctx.addIssue({
    //     path: ["pointsPerWinner"],
    //     message: "Points per winner is required",
    //     code: "custom",
    //   });
    // }

    // if (!data.startDate) {
    //   ctx.addIssue({
    //     path: ["startDate"],
    //     message: "Start date is required",
    //     code: "custom",
    //   });
    // }

    // if (data.startDate && data.startDate < new Date()) {
    //   ctx.addIssue({
    //     path: ["startDate"],
    //     message: "Start date must be greater than or equal today",
    //     code: "custom",
    //   });
    // }

    if (data.rewardType === "token") {
      if (!data.tokenContract || data.tokenContract.trim() === "") {
        ctx.addIssue({
          path: ["tokenContract"],
          message: "Token contract is required",
          code: "custom",
        });
      }
    }

    // if (!data.runContinuously) {
    //   if (!data.endDate) {
    //     ctx.addIssue({
    //       path: ["endDate"],
    //       message: "End date is required",
    //       code: "custom",
    //     });
    //   }
    // }

    // if (
    //   !data.runContinuously &&
    //   data.endDate &&
    //   data.endDate < data.startDate
    // ) {
    //   ctx.addIssue({
    //     path: ["endDate"],
    //     message: "End date must be greater than start date",
    //     code: "custom",
    //   });
    // }

    if (!data.rewardMode) {
      ctx.addIssue({
        path: ["rewardMode"],
        message: "Reward mode is required",
        code: "custom",
      });
    }

    if (!data.questGoal) {
      ctx.addIssue({
        path: ["questGoal"],
        message: "Quest goal is required",
        code: "custom",
      });
    }
  });
