export const Absynth = {
  registerNewClient: async (clientName: string, avatarQuota: number): Promise<any | void> => {
    try {
      const res = await fetch(process.env.ABSYNTH_URL, {
        method: 'POST',
        body: JSON.stringify({
          clientName,
          avatarQuota
        }),
        headers: {
          'Content-Type': 'application/json',
          'auth-key': process.env.ABSYNTH_KEY
        }
      });

      const json = await res.json();

      if (!json.authKey) {
        throw new Error("Absynth can't register the new partner");
      }

      return { success: true, authKey: json.authKey };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};
