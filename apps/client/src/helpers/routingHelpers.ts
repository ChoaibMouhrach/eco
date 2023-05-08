export const redirect = (destination: string) => ({
  redirect: {
    destination,
    permanent: true,
  },
});
