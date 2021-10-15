export interface HashComparer {
  compare: (value: string, hashedValue: string) => Promise<boolean>
}
