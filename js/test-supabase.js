async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("site_settings")
        .select("*")
        .limit(1);

    if (error) {
        console.error("❌ Supabase connection failed");
        console.error("Message:", error.message);
        console.error("Details:", error.details);
        console.error("Hint:", error.hint);
        console.error("Code:", error.code);
        return;
    }

    console.log("✅ Supabase connected successfully!");
    console.log("Site settings:", data);
}

testSupabaseConnection();