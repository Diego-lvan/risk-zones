/**
 * Import necessary classes and interfaces.
 */
import { LightedStreetsRepositoryImpl } from "../../infraestructure/repositories/lighted_streets_repository";
import { LightedStreetsDatasourceImpl } from "../../infraestructure/datasources/lighted_streets_datasource";
import { LightedStreetRatingForm } from "../entities/lighted_street_rating_form";

/**
 * Use case for rating a lighted street.
 */
export class RateLightedStreetUseCase {
  private lightedStreetsRepository: LightedStreetsRepositoryImpl;

  /**
   * Constructor initializes the repository with a datasource.
   */
  constructor() {
    const datasource = new LightedStreetsDatasourceImpl();
    this.lightedStreetsRepository = new LightedStreetsRepositoryImpl(
      datasource
    );
  }

  /**
   * Executes the use case to rate a lighted street.
   * @param form - The form containing the rating details.
   */
  public async execute(form: LightedStreetRatingForm) {
    await this.lightedStreetsRepository.rateLightedStreet(form);
  }
}
