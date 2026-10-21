
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#10131b">
<title>Social Growth Studio</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#10131b;color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
main{max-width:1000px;margin:auto;padding:24px 16px}
header{display:flex;align-items:center;gap:12px;margin:12px 0 30px}
.logo{background:#796aff;padding:12px;border-radius:14px;font-size:22px}
h1{font-size:24px;margin:0}
p{color:#a8afbf;line-height:1.6}
.hero,.card{background:#191e2a;border:1px solid #30384b;border-radius:18px;padding:20px;margin-bottom:16px}
.hero{background:#1a2030}
.hero h2{font-size:27px;margin:12px 0}
.badge{display:inline-block;background:#253d36;color:#86e3b0;padding:6px 10px;border-radius:20px;font-size:12px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.card h3{margin:10px 0}
.emoji{font-size:25px}
button{background:#796aff;color:white;border:0;border-radius:10px;padding:12px 16px;font-size:15px;font-weight:600;cursor:pointer}
input,select{width:100%;padding:12px;background:#101521;border:1px solid #394258;border-radius:9px;color:white;margin:7px 0 14px;font-size:15px}
label{font-size:13px;color:#c1c7d4}
.result{white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;color:#a8e6bd;margin-top:12px}
footer{padding:25px 0;color:#8992a4;font-size:12px}
</style>
</head>
<body>
<main>
<header>
<div class="logo">✦</div>
<div>
<h1>Social Growth Studio</h1>
<p style="margin:4px 0">Client Acquisition Dashboard</p>
</div>
</header>

<section class="hero">
<span class="badge">● Dashboard ready</span>
<h2>Find better business leads.</h2>
<p>Discover creators, influencers, agencies and businesses for your social media growth services.</p>
<button id="check">Check Backend Status</button>
<div id="status" class="result"></div>
</section>

<section class="grid">
<div class="card">
<div class="emoji">⌕</div>
<h3>AI Lead Finder</h3>
<p>Find relevant prospects by country, platform and business niche.</p>
<span class="badge">Search API pending</span>
</div>
<div class="card">
<div class="emoji">✎</div>
<h3>AI Message Studio</h3>
<p>Prepare personalized English and Hindi outreach drafts.</p>
<span class="badge">Coming next</span>
</div>
<div class="card">
<div class="emoji">▤</div>
<h3>Lead Manager</h3>
<p>Organize prospects, contact permissions and customer status.</p>
<span class="badge">Database pending</span>
</div>
<div class="card">
<div class="emoji">↗</div>
<h3>Outreach Center</h3>
<p>Manage approved email and WhatsApp outreach and follow-ups.</p>
<span class="badge">Integration pending</span>
</div>
</section>

<section class="card">
<h3>Prepare a lead search</h3>
<label for="country">Target country</label>
<select id="country">
<option>India</option>
<option>United States</option>
<option>United Kingdom</option>
<option>Canada</option>
<option>Australia</option>
<option>United Arab Emirates</option>
</select>

<label for="platform">Platform</label>
<select id="platform">
<option>Instagram</option>
<option>YouTube</option>
<option>TikTok</option>
<option>Business websites</option>
</select>

<label for="niche">Customer niche</label>
<input id="niche" maxlength="100" placeholder="e.g. fitness creators">

<button id="prepare">Prepare Search</button>
<div id="preview" class="result"></div>
<p style="font-size:12px">This preview does not search the internet or send messages yet.</p>
</section>

<footer>Personal workspace · Keep API keys private · Respect contact preferences</footer>
</main>

<script>
document.getElementById("check").addEventListener("click",async()=>{
 const out=document.getElementById("status");
 out.textContent="Checking backend...";
 try{
  const r=await fetch("/api/health");
  const d=await r.json();
  out.textContent="Backend: "+d.status+" | "+d.app;
 }catch(e){
  out.textContent="Backend check failed. Confirm deployment.";
 }
});

document.getElementById("prepare").addEventListener("click",()=>{
 const country=document.getElementById("country").value;
 const platform=document.getElementById("platform").value;
 const niche=document.getElementById("niche").value.trim();
 const out=document.getElementById("preview");

 if(!niche){
  out.textContent="Please enter a customer niche first.";
  return;
 }

 out.textContent=
 "Search request prepared\\n"+
 "Country: "+country+"\\n"+
 "Platform: "+platform+"\\n"+
 "Niche: "+niche+"\\n\\n"+
 "Next step: connect the search API.";
});
</script>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return Response.json({
        status: "online",
        app: "Social Growth Studio"
      }, {
        headers: { "Cache-Control": "no-store" }
      });
    }

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "no-store"
        }
      });
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  }
};
