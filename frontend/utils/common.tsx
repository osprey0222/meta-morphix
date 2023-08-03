export const generateUrl = (url: string, data: { [key: string]: string }) => {
  try {
    Object.entries(data).forEach(([key, value]) => {
      url = url.replace(":" + key, value);
    });
  } catch (error) {
    console.log(error);
  }
  return url;
};
