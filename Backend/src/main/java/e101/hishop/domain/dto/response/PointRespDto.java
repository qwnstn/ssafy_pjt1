package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Point;
import e101.hishop.domain.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.h2.engine.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PointRespDto {

    private Long pointId;

    private Long userId;

    private Long point;

    private LocalDateTime endDate;

    private String category;

    private String description;

    @Builder
    public PointRespDto(Long pointId, Long userId, Long point, LocalDateTime endDate, String category, String description) {
        this.pointId = pointId;
        this.userId = userId;
        this.point = point;
        this.endDate = endDate;
        this.category = category;
        this.description = description;
    }


    public static PointRespDto of (Point point) {
        return PointRespDto.builder()
                .pointId(point.getId())
                .userId(point.getUser().getId())
                .point(point.getPoint())
                .endDate(point.getEndDate())
                .category(point.getCategory())
                .description(point.getDescription())
                .build();
    }

}
