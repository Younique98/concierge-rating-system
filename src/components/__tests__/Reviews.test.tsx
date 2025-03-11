import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reviews from '@/components/Reviews';
import { useReviews } from '../../../hooks/useReviews';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { TestProvider } from '@/tests/TestProvider';

jest.mock('../../../hooks/useReviews', () => ({
  useReviews: jest.fn(),
}));

describe('Reviews Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list of reviews correctly', async () => {
    (useReviews as jest.Mock).mockReturnValue({
      reviews: [
        { id: 1, rating: 5, review: 'Great service!', author: 'John' },
        { id: 2, rating: 4, review: 'Nice experience.', author: 'Jane' },
      ],
      isError: false,
      isFetching: false,
      page: 1,
      setPage: jest.fn(),
      hasMoreReviews: true,
      refetch: jest.fn(),
    });

    render(<Reviews />, { wrapper: TestProvider });

    expect(screen.getByText('User Reviews')).toBeInTheDocument();
    expect(screen.getByText('Great service!')).toBeInTheDocument();
    expect(screen.getByText('Nice experience.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('displays an error message when API fails', async () => {
    (useReviews as jest.Mock).mockReturnValue({
      reviews: [],
      isError: true,
      isFetching: false,
      page: 1,
      setPage: jest.fn(),
      hasMoreReviews: false,
      refetch: jest.fn(),
    });

    render(<Reviews />, { wrapper: TestProvider });

    await waitFor(() =>
      expect(screen.getByText(/No reviews available/i)).toBeInTheDocument(),
    );
  });

  it('calls setPage when clicking the Next button', async () => {
    const mockSetPage = jest.fn();
    (useReviews as jest.Mock).mockReturnValue({
      reviews: [{ id: 1, rating: 5, review: 'Great!', author: 'John' }],
      isError: false,
      isFetching: false,
      page: 1,
      setPage: mockSetPage,
      hasMoreReviews: true,
      refetch: jest.fn(),
    });

    render(<Reviews />, { wrapper: TestProvider });

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockSetPage).toHaveBeenCalledWith(expect.any(Function));
  });

  it('handles smooth scrolling when clicking the next page button', async () => {
    global.scrollTo = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
    const mockSetPage = jest.fn();
    (useReviews as jest.Mock).mockReturnValue({
      reviews: [{ id: 1, rating: 5, review: 'Amazing!', author: 'Alice' }],
      isError: false,
      isFetching: false,
      page: 1,
      setPage: mockSetPage,
      hasMoreReviews: true,
      refetch: jest.fn(),
    });

    const { getByRole } = render(<Reviews />, { wrapper: TestProvider });

    const nextButton = getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => expect(mockSetPage).toHaveBeenCalled());

    // waiting for scrollIntoView to be called
    await waitFor(() => {
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  it('shows "No reviews available" when there are no reviews', async () => {
    (useReviews as jest.Mock).mockReturnValue({
      reviews: [],
      isError: false,
      isFetching: false,
      page: 1,
      setPage: jest.fn(),
      hasMoreReviews: false,
      refetch: jest.fn(),
    });

    render(<Reviews />, { wrapper: TestProvider });

    expect(screen.getByText(/no reviews available/i)).toBeInTheDocument();
  });
});
