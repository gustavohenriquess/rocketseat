import { randomUUID } from "node:crypto"
import { UniqueEntityId } from "./unique-entity-id"

export class Entity<Props> {
  private _id: UniqueEntityId
  protected props: any

  protected constructor(props: Props, id?: string) {
    this._id = new UniqueEntityId(id)
    this.props = props
  }

  get id() {
    return this._id
  }
}

