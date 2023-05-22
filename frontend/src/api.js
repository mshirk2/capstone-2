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

    static async getTools(title) {
        let res = await this.request(`tools`, { title });
        return res.tools;
    }

    static async getTool(id) {
        let res = await this.request(`tools/${id}`);
        return res.tool;
    }

    static async getCurrentUser(id) {
        let res = await this.request(`users/${id}`);
        return res.user;
    }

    static async getReservations(user_id, tool_id, is_active) {
        let res = await this.request(`reservations`, { user_id, tool_id, is_active });
        return res.reservations;
    }

    // Using reservation id, set returned date, set is_active to false
    static async completeReservation(id){
        let res = await this.request(`reservations/${id}/complete`, {}, "patch");
        return res;
    }

    static async createReservation(data){
        let res = await this.request(`reservations`, data, "post");
        return res;
    }

    static async deleteReservation(id) {
        let res = await this.request(`reservations/${id}/delete`, {}, "delete");
        return res;
    }

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res;
    }

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res;
    }

    static async updateProfile(id, data) {
        let res = await this.request(`users/${id}`, data, "patch");
        return res.user;
    }

}

// for now we'll put token ("testuser" / "password" on class)
ToolLibraryApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default ToolLibraryApi;