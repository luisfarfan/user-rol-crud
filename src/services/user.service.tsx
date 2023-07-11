import http from "../http.tsx";
import { CreatePolicyToUser, EditPolicyToUser, Setup, User, UserPolicyDetail } from "../models/user.models.tsx";
import { AxiosResponse } from "axios";

class UserService {
    setup(): Promise<AxiosResponse<Setup>> {
        return http.get('managePolicy/setup')
    }

    users(): Promise<AxiosResponse<User[]>> {
        return http.get('managePolicy/users')
    }

    policiesByUser(userId: number): Promise<AxiosResponse<UserPolicyDetail[]>> {
        return http.get('managePolicy/users-policy/' + userId)
    }

    createPolicy(data: CreatePolicyToUser) {
        return http.post('managePolicy/create-policy/', data)
    }

    createUser(data: User) {
        return http.post('managePolicy/users', data)
    }

    editPolicy(data: EditPolicyToUser) {
        return http.post('managePolicy/edit-policy', data)
    }

    deletePolicy(policyId: number) {
        return http.delete('managePolicy/delete-policy/' + policyId)
    }
}

export default new UserService();