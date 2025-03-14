/**
 * Klass för att representera en medlem.
 */
import { Member as MemberType } from "./types";

export class Member implements MemberType {
    id: string;
    name: string;
    roles: ("UX" | "Frontend" | "Backend")[];

    constructor(member: MemberType) {
        this.id = member.id;
        this.name = member.name;
        this.roles = member.roles;
    }
}