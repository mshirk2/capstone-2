import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ToolLibraryApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        // pass auth token through the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ToolLibraryApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    // Get list of tools, with option to filter by tool title
    static async getTools(title) {
        let res = await this.request(`tools`, { title });
        return res.tools;
    }

    // Get details on a tool by tool id
    static async getTool(id) {
        let res = await this.request(`tools/${id}`);
        return res.tool;
    }

    // Get current user by username
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    // User signup
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    // User login
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    // Update user profile
    static async updateProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

}

// for now we'll put token ("testuser" / "password" on class)
ToolLibraryApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default ToolLibraryApi;