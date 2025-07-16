from pydantic import BaseModel

class BreastCancerInput(BaseModel):
    smoothness_mean: float
    symmetry_mean: float
    fractal_dimension_mean: float
    texture_se: float
    area_se: float
    smoothness_se: float
    compactness_se: float
    concavity_se: float
    concave_points_se: float
    symmetry_se: float
    fractal_dimension_se: float
    texture_worst: float
    area_worst: float
    smoothness_worst: float
    concave_points_worst: float
    symmetry_worst: float
    fractal_dimension_worst: float
