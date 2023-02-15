package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Branch;
import e101.hishop.domain.entity.Point;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PointReqDto {
    private Long userId;
    private Long point;
    private LocalDateTime endDate;
    private String category;
    private String description;

    public Point toPointEntity(){
        return Point.builder()
                .point(point)
                .endDate(endDate)
                .category(category)
                .description(description)
                .build();
    }
}
