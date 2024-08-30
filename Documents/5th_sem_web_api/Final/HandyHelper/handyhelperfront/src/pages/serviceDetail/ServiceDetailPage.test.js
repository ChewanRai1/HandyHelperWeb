import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServiceDetailPage from './ServiceDetailPage';
import { 
  getSingleService, 
  addToCartApi, 
  getServiceReviewsApi, 
  createReviewApi, 
  addFavoriteServiceApi 
} from '../../apis/api';
import { toast } from 'react-hot-toast';

// Mock the API functions and toast notifications
jest.mock('../../apis/api');
jest.mock('react-hot-toast');

describe('ServiceDetailPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should add the service to the cart successfully', async () => {
    const mockService = {
      serviceTitle: 'Mock Service',
      servicePrice: 100,
      serviceDescription: 'Mock service description',
      serviceCategory: 'Mock Category',
      serviceLocation: 'Mock Location',
      serviceImage: 'mock-image.jpg',
    };
    
    getSingleService.mockResolvedValue({ status: 200, data: { service: mockService } });
    getServiceReviewsApi.mockResolvedValue({ status: 200, data: { reviews: [] } });
    addToCartApi.mockResolvedValue({ status: 200 });
    
    await act(async () => {
      render(
        <MemoryRouter>
          <ServiceDetailPage />
        </MemoryRouter>
      );
    });
    
    const planForLaterButton = await screen.findByText(/Plan for later/i);

    await act(async () => {
      fireEvent.click(planForLaterButton);
    });

    await waitFor(() => {
      expect(addToCartApi).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('Service added to cart!');
    });
  });

  it('Should submit a review successfully', async () => {
    const mockService = {
      serviceTitle: 'Mock Service',
      servicePrice: 100,
      serviceDescription: 'Mock service description',
      serviceCategory: 'Mock Category',
      serviceLocation: 'Mock Location',
      serviceImage: 'mock-image.jpg',
    };
    
    getSingleService.mockResolvedValue({ status: 200, data: { service: mockService } });
    getServiceReviewsApi.mockResolvedValue({ status: 200, data: { reviews: [] } });
    createReviewApi.mockResolvedValue({ status: 201, data: { data: { comment: 'Great service!', rating: 5 } } });

    await act(async () => {
      render(
        <MemoryRouter>
          <ServiceDetailPage />
        </MemoryRouter>
      );
    });
    
    const ratingInput = await screen.findAllByLabelText(/Rating/i);
    const commentInput = await screen.findByLabelText(/Comment/i);
    const submitButton = await screen.findByText(/Submit Review/i);

    fireEvent.change(commentInput, { target: { value: 'Awesome service!' } });
    fireEvent.click(ratingInput[0]);  // Simulate selecting a rating

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createReviewApi).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('Review submitted successfully!');
    });
  });

  it('Should handle adding the service to favorites successfully', async () => {
    const mockService = {
      serviceTitle: 'Mock Service',
      servicePrice: 100,
      serviceDescription: 'Mock service description',
      serviceCategory: 'Mock Category',
      serviceLocation: 'Mock Location',
      serviceImage: 'mock-image.jpg',
    };
    
    getSingleService.mockResolvedValue({ status: 200, data: { service: mockService } });
    getServiceReviewsApi.mockResolvedValue({ status: 200, data: { reviews: [] } });
    addFavoriteServiceApi.mockResolvedValue({ status: 200 });

    await act(async () => {
      render(
        <MemoryRouter>
          <ServiceDetailPage />
        </MemoryRouter>
      );
    });
    
    const addToFavoritesButton = await screen.findByText(/Plan for later/i);

    await act(async () => {
      fireEvent.click(addToFavoritesButton);
    });

    await waitFor(() => {
      expect(addFavoriteServiceApi).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('Service added to favorites!');
    });
  });
});