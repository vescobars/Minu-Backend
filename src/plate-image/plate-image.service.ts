import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../image/image.entity';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PlateImageService {

    constructor(
    @InjectRepository(PlateEntity)
    private readonly plateRepository: Repository<PlateEntity>,

    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>){}

    async addImagePlate(plateId: string, imageId: string): Promise<PlateEntity> {
        const image: ImageEntity = await this.imageRepository.findOne({where: {id: imageId}});
        if (!image)
          throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND);
      
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["images", "exhibitions"]})
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND);
    
          plate.images = [...plate.images, image];
        return await this.plateRepository.save(plate);
      }
    
    async findImageByPlateIdImageId(plateId: string, imageId: string): Promise<ImageEntity> {
        const image: ImageEntity = await this.imageRepository.findOne({where: {id: imageId}});
        if (!image)
          throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
       
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["images"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
   
        const plateImage: ImageEntity = plate.images.find(e => e.id === image.id);
   
        if (!plateImage)
          throw new BusinessLogicException("The image with the given id is not associated to the plate", BusinessError.PRECONDITION_FAILED)
   
        return plateImage;
    }
    
    async findImagesByPlateId(plateId: string): Promise<ImageEntity[]> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["images"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
       
        return plate.images;
    }
    
    async associateImagesPlate(plateId: string, images: ImageEntity[]): Promise<PlateEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["images"]});
    
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < images.length; i++) {
          const image: ImageEntity = await this.imageRepository.findOne({where: {id: images[i].id}});
          if (!image)
            throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        plate.images = images;
        return await this.plateRepository.save(plate);
      }
    
    async deleteImagePlate(plateId: string, imageId: string){
        const image: ImageEntity = await this.imageRepository.findOne({where: {id: imageId}});
        if (!image)
          throw new BusinessLogicException("The image with the given id was not found", BusinessError.NOT_FOUND)
    
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["images"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        const plateImage: ImageEntity = plate.images.find(e => e.id === image.id);
    
        if (!plateImage)
            throw new BusinessLogicException("The image with the given id is not associated to the plate", BusinessError.PRECONDITION_FAILED)
 
            plate.images = plate.images.filter(e => e.id !== imageId);
        await this.plateRepository.save(plate);
    }  
}
