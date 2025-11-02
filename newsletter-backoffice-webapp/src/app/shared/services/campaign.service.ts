import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Campaign, CreatesCampaign} from '../model/campaign.model';
import {PageRequest} from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private readonly client = inject(HttpClient);

  public creates(newsletterId: string, createCampaign: CreatesCampaign) {
    return this.client.post<void>('http://localhost:1010/newsletters/' + newsletterId + '/campaigns', createCampaign)
  }

  public listAll(newsletterId: string, pageRequest: PageRequest) {
    return this.client.get<Campaign[]>('http://localhost:1010/newsletters/' + newsletterId + '/campaigns', {
      params: {
        size: pageRequest.pageSize,
        page: pageRequest.pageIndex
      }
    });
  }

}
