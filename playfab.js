// playfab.js - Login using device ID and get YT currency
async function loginWithDeviceId() {
  const customId = localStorage.getItem('device_id') || crypto.randomUUID();
  localStorage.setItem('device_id', customId);

  const res = await fetch('https://1BD467.playfabapi.com/Client/LoginWithCustomID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-PlayFabSDK': 'Custom'
    },
    body: JSON.stringify({
      TitleId: '1BD467,
      CustomId: customId,
      CreateAccount: true
    })
  });

  const data = await res.json();
  console.log("Login result:", data);
  if (data.data && data.data.PlayFabId) {
    window.playfabId = data.data.PlayFabId;
    getVirtualCurrency();
  }
}

async function getVirtualCurrency() {
  const res = await fetch('https://1BD467.playfabapi.com/Client/GetUserInventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': window.playfabId
    },
    body: JSON.stringify({})
  });

  const data = await res.json();
  console.log("YT Coins:", data);
}

window.onload = () => {
  loginWithDeviceId();
}
