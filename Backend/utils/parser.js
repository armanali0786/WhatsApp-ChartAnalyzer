function parseChat(text) {
  const lines = text.split("\n");

  const messageRegex =
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),\s\d{1,2}:\d{2}\s[AP]M\s-\s([^:]+):\s(.+)$/;

  const joinRegex =
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4}),.*joined using this group's invite link$/;

  const dailyActiveUsers = {}; // day -> Set of users
  const dailyNewUsers = {};    // day -> number
  const userActiveDays = {};   // user -> Set(days)

  let lastDate = null;

  for (const line of lines) {
    let match;

    // -------- JOIN EVENT (ORANGE BAR) --------
    match = line.match(joinRegex);
    if (match) {
      const [, mm, dd, yy] = match;
      const year = yy.length === 2 ? `20${yy}` : yy;
      const dayKey = `${year}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

      dailyNewUsers[dayKey] = (dailyNewUsers[dayKey] || 0) + 1;
      continue;
    }

    // -------- MESSAGE EVENT (BLUE BAR) --------
    match = line.match(messageRegex);
    if (!match) continue;

    const [, mm, dd, yy, sender, message] = match;
    if (message.includes("<Media omitted>")) continue;

    const year = yy.length === 2 ? `20${yy}` : yy;
    const dayKey = `${year}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

    lastDate = new Date(dayKey);

    if (!dailyActiveUsers[dayKey]) {
      dailyActiveUsers[dayKey] = new Set();
    }
    dailyActiveUsers[dayKey].add(sender);

    if (!userActiveDays[sender]) {
      userActiveDays[sender] = new Set();
    }
    userActiveDays[sender].add(dayKey);
  }

  if (!lastDate) throw new Error("No valid messages found");

  // -------- LAST 7 DAYS --------
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(lastDate);
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split("T")[0]);
  }

  // -------- GRAPH DATA (FOR CHART) --------
  const graph = last7Days.map(day => ({
    date: day,
    activeUsers: dailyActiveUsers[day]?.size || 0, // BLUE
    newUsers: dailyNewUsers[day] || 0               // ORANGE
  }));

  // -------- USERS ACTIVE ≥ 4 DAYS --------
  const active4DaysUsers = Object.entries(userActiveDays)
    .map(([name, days]) => ({
      name,
      activeDays: [...days].filter(d => last7Days.includes(d)).length
    }))
    .filter(u => u.activeDays >= 4);

  return {
    graph,
    active4DaysUsers
  };
}
