/**
 * Interface representing a form for rating a lighted street.
 */
export interface LightedStreetRatingForm {
  /**
   * The unique identifier of the street being rated.
   */
  streetId: string;

  /**
   * The unique identifier of the user providing the rating.
   */
  userId: string;

  /**
   * The rating given to the street by the user.
   * This should be a numerical value, typically within a predefined range.
   */
  rating: number;
}
