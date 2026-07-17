const toBoolean = (value: string | undefined): boolean =>
  value?.toLowerCase() !== "false";

export const features = {
  registration: toBoolean(process.env.NEXT_PUBLIC_REGISTRATION_ENABLED),
  mediaUpload: toBoolean(process.env.NEXT_PUBLIC_MEDIA_UPLOAD_ENABLED),
  mediaDelete: toBoolean(process.env.NEXT_PUBLIC_MEDIA_DELETE_ENABLED),
} as const;
