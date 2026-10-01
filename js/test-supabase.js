async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("site_settings")
        .select("*")
        .limit(1);

    if (error) {
        console.error("❌ Supabase connection failed:", error);
        return;
    }

    console.log("✅ Supabase connected successfully!");
    console.log("Site settings:", data);
}

testSupabaseConnection();