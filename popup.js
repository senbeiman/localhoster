async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

changeUrl.addEventListener("click", async () => {
  const tab = await getCurrentTab();
  if(!tab) {
    alert("no active tab to change url");
    return;
  }
  const url = new URL(tab.url);
  const path = url.pathname;
  const params = url.searchParams;
  chrome.tabs.update(tab.id, { url: `http://localhost:${port.value}${path}?${params}`});
});

port.addEventListener("change", (e) => {
  chrome.storage.sync.set({ port: e.currentTarget.value });
});

window.onload = function() {
  chrome.storage.sync.get(['port'], function(result) {
    port.value = result.port || 3000;
  });
}
