//
//
// for the basic "get all" or "get sinlge" properties, we define them here because we will use them often

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function FETCH_allProperties() {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) return [];
    const res = await fetch(`${apiDomain}/properties`, {
      // next: { revalidate: 10 },
      cache: "no-cache",
    });
    if (!res.ok) throw new Error("Failed to fetch properties");

    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Return an empty array as a fallback
  }
}

export async function FETCH_sinleProperty(id) {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) return null;
    const res = await fetch(`${apiDomain}/properties/${id}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) throw new Error("Failed to fetch property");

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
