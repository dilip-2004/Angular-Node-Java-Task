export interface CalculationRequest {
  a: number;
  b: number;
  op: 'add' | 'sub' | 'mul' | 'div';
}

export interface CalculationResponse {
  _id?: string;
  a: number;
  b: number;
  op: string;
  result: number;
  createdAt?: string;
  updatedAt?: string;
}