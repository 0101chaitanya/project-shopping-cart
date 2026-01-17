# FakeStoreAPI Login Testing Guide

## Test the API Directly in Browser Console

Copy and paste this in your browser's developer console (F12):

```javascript
fetch("https://fakestoreapi.com/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "mor_2314", password: "83r5^_" }),
})
  .then((res) => {
    console.log("Status:", res.status, res.statusText);
    return res.json();
  })
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error("Error:", err));
```

## What to look for:

1. **Status 200** - Credentials are correct
   - Response should contain `{ token: "..." }`

2. **Status 401** - Invalid credentials
   - Check if username/password are wrong
   - Try other test usernames from the API

3. **Status 400** - Bad request
   - Check request body format
   - Ensure JSON is properly formatted

4. **Other errors** - Connection issues
   - Check network tab in DevTools
   - Ensure API is reachable

## Alternative Test Usernames from FakeStoreAPI:

Valid credentials (verified to work):

- `mor_2314` with password `83r5^_` ✅
- `johnd` with password `m38rmF$` ✅
- `kevinryan` with password `kev02937@` ✅

## Expected Success Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Next Steps:

If the API test works but the app still fails:

1. Check browser console for any JavaScript errors
2. Verify Redux is receiving the response correctly
3. Check localStorage to see if token is saved

If the API test fails:

1. The FakeStoreAPI might have changed
2. Demo credentials might no longer be valid
3. You may need to register new credentials
