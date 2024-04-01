export interface ICreateConfigurationRequestDTO {
  hasTshirt: string;
  hasNameInTshirt: string;
  tShirtSizes: string[];
}

export interface IConfiguration {
  configuration: {
    id: string;
    tShirtFlags: {
      id: string;
      hasNameInTshirt: boolean;
      hasTshirt: boolean;
      tShirtSizes: string[];
    };
  };
}
