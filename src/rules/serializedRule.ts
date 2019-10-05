import { Rule } from "./rule"

export enum RuleType {
    AdjacencyRule ,
    OccurrenceRule
}

export class SerializedRule {
    public readonly ruleType : RuleType
    public readonly rule : Rule

}
