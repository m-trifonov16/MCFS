import { FormData } from "../types/FormData";
import config from "../config";

interface ApiResponse {
    success: boolean;
    data?: any;
}
  
export const SubmitForm = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(config.submitFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
    };
  }
};
  